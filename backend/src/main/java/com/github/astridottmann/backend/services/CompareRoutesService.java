package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.CompareRoutes;
import com.github.astridottmann.backend.models.CompareRoutesDTO;
import com.github.astridottmann.backend.models.ComparisonResults;
import com.github.astridottmann.backend.models.Route;
import com.github.astridottmann.backend.repositories.CompareRoutesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CompareRoutesService {
    private final CompareRoutesRepository compareRoutesRepository;
    private final IdService idService;

    public ComparisonResults compareEmissions(List<Route> compared) {
        double emissionRouteOne = compared.get(0).co2EmissionRoute();
        double emissionRouteTwo = compared.get(1).co2EmissionRoute();

        double difference = emissionRouteOne - emissionRouteTwo;
        double differenceRounded = Math.round(difference * 100.0) / 100.0;

        return new ComparisonResults(emissionRouteOne, emissionRouteTwo, differenceRounded);
    }

    public List<CompareRoutes> getAllCompareRoutes() {
        return compareRoutesRepository.findAll();
    }

    public CompareRoutes getCompareRoutesById(String id) {
        return compareRoutesRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Not found!"));
    }

    public CompareRoutes addComparison(CompareRoutesDTO compareRoutesDTO) {
        CompareRoutes compareRoutesToAdd = new CompareRoutes(
                idService.createRandomId(),
                compareRoutesDTO.userId(),
                compareRoutesDTO.compared(),
                compareEmissions(compareRoutesDTO.compared()));

        return compareRoutesRepository.save(compareRoutesToAdd);
    }

    public void deleteCompareRoutesById(String id) {
        if (!compareRoutesRepository.existsById(id)) {
            String errorMessage = "Could not delete. Id " + id + " doesn't exist";
            throw new NoSuchElementException(errorMessage);
        }

        compareRoutesRepository.deleteById(id);
    }

    public CompareRoutes updateComparison(CompareRoutes compareRoutes) {
        if (!compareRoutesRepository.existsById(compareRoutes.id())) {
            String errorMessage = "Couldn't update Compared Routes. Id " + compareRoutes.id() + " doesn't exist";
            throw new NoSuchElementException(errorMessage);
        }

        List<Route> routes = List.of(
                compareRoutes.compared().get(0),
                compareRoutes.compared().get(1));

        CompareRoutes updatedCompareRoutes = new CompareRoutes(
                compareRoutes.id(),
                compareRoutes.userId(),
                routes,
                compareEmissions(compareRoutes.compared()));

        return compareRoutesRepository.save(updatedCompareRoutes);
    }

    public void updateAllComparisonContainingRoute(Route route) {
        List<CompareRoutes> compareRoutesWithRoute = compareRoutesRepository.findAllByComparedId(route.id());

        List<CompareRoutes> updatedCompareRoutes = compareRoutesWithRoute.stream().map((compareRoutes -> {
                    List<Route> currentCompared = compareRoutes.compared()
                            .stream()
                            .map(currentRoute -> currentRoute.id().equals(route.id()) ? route : currentRoute)
                            .toList();
                    return new CompareRoutes(compareRoutes.id(), compareRoutes.userId(), currentCompared, compareEmissions(currentCompared));
                }))
                .toList();

        compareRoutesRepository.saveAll(updatedCompareRoutes);
    }
}

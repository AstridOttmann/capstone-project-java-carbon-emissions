package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.CompareRoutes;
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
        String errorMessage = "Not found!";
        return compareRoutesRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(errorMessage));
    }

    public CompareRoutes addComparison(List<Route> compared) {
        CompareRoutes compareRoutesToAdd = new CompareRoutes(
                idService.createRandomId(),
                List.of(compared.get(0), compared.get(1)),
                compareEmissions(compared));

        return compareRoutesRepository.save(compareRoutesToAdd);
    }

    public void deleteCompareRoutesById(String id) {
        String errorMessage = "Could not delete. Id " + id + " doesn't exist";
        if (compareRoutesRepository.existsById(id)) {
            compareRoutesRepository.deleteById(id);
        } else throw new NoSuchElementException(errorMessage);
    }

    public CompareRoutes updateComparison(CompareRoutes compareRoutes) {
        if (compareRoutesRepository.existsById(compareRoutes.id())) {
            CompareRoutes updatedCompareRoutes =
                    new CompareRoutes(
                            compareRoutes.id(),
                            List.of(compareRoutes.compared().get(0), compareRoutes.compared().get(1)),
                            compareEmissions(compareRoutes.compared()));
            return compareRoutesRepository.save(updatedCompareRoutes);
        }
        String errorMessage = "Couldn't update Compared Routes. Id " + compareRoutes.id() + " doesn't exist";
        throw new NoSuchElementException(errorMessage);

    }
}

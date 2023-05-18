package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.*;
import com.github.astridottmann.backend.repositories.CompareRoutesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CompareRoutesService {
    private final CompareRoutesRepository compareRoutesRepository;
    private final IdService idService;
    private final MongoUserDetailsService mongoUserDetailsService;

    public ComparisonResults createComparisonResults(List<Route> compared, List<Usage> usages) {
        double emissionRouteOne = compared.get(0).co2EmissionRoute();
        double emissionRouteTwo = compared.get(1).co2EmissionRoute();

        double difference = emissionRouteOne - emissionRouteTwo;

        double bonusOne = Math.round(Math.abs(difference) * 100.0) / 100.0;
        double bonusTwo = Math.round(-Math.abs(difference) * 100.0) / 100.0;

        if (emissionRouteOne < emissionRouteTwo) {
            double temp = bonusOne;
            bonusOne = bonusTwo;
            bonusTwo = temp;
        }

        return new ComparisonResults(bonusOne, bonusTwo, usages);
    }

    public List<CompareRoutes> getAllCompareRoutes() {
        return compareRoutesRepository.findAll();
    }

    public List<CompareRoutes> getAllByUserId(String userId) {
        String errorMessage = "Unable to load data. User not found!";

        if (!mongoUserDetailsService.existsById(userId)) {
            throw new NoSuchElementException(errorMessage);
        }
        return compareRoutesRepository.findAllByUserId(userId);
    }

    public List<CompareRoutes> getAllByRouteId(String id) {
        return compareRoutesRepository.findAllByComparedId(id);
    }

    public CompareRoutes getCompareRoutesById(String id) {
        return compareRoutesRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Not found!"));
    }

    public CompareRoutes addComparison(CompareRoutesDTO compareRoutesDTO) {
        CompareRoutes compareRoutesToAdd =
                CompareRoutes.createCompareRoutesFromDTO(
                        compareRoutesDTO,
                        idService.createRandomId(),
                        createComparisonResults(compareRoutesDTO.compared(), Collections.emptyList()));

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

        List<Usage> usages = compareRoutes.comparisonResults().usages();

        List<Route> routes = List.of(
                compareRoutes.compared().get(0),
                compareRoutes.compared().get(1));

        CompareRoutes updatedCompareRoutes = new CompareRoutes(
                compareRoutes.id(),
                compareRoutes.userId(),
                routes,
                createComparisonResults(compareRoutes.compared(), usages));

        return compareRoutesRepository.save(updatedCompareRoutes);
    }

    public void updateAllComparisonContainingRoute(Route route) {
        List<CompareRoutes> compareRoutesWithRoute = compareRoutesRepository.findAllByComparedId(route.id());

        List<CompareRoutes> updatedCompareRoutes = compareRoutesWithRoute.stream().map((compareRoutes -> {
                    List<Route> currentCompared = compareRoutes.compared()
                            .stream()
                            .map(currentRoute -> currentRoute.id().equals(route.id()) ? route : currentRoute)
                            .toList();
                    return new CompareRoutes(
                            compareRoutes.id(),
                            compareRoutes.userId(),
                            currentCompared,
                            createComparisonResults(currentCompared, compareRoutes.comparisonResults().usages()));
                }))
                .toList();

        compareRoutesRepository.saveAll(updatedCompareRoutes);
    }
}

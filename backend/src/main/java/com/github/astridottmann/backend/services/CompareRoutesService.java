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

    public CompareRoutes addComparison(List<Route> compared) {
        String idCompareRoutes = idService.createRandomId();
        double emissionRouteOne = compared.get(0).co2EmissionRoute();
        double emissionRouteTwo = compared.get(1).co2EmissionRoute();
        double difference = emissionRouteOne - emissionRouteTwo;
        double differenceRounded = Math.round(difference * 100.0) / 100.0;

        CompareRoutes compareRoutesToAdd = new CompareRoutes(
                idCompareRoutes,
                List.of(compared.get(0), compared.get(1)),
                new ComparisonResults(emissionRouteOne, emissionRouteTwo, differenceRounded));

        return compareRoutesRepository.save(compareRoutesToAdd);
    }

    public List<CompareRoutes> getAllCompareRoutes() {
        return compareRoutesRepository.findAll();
    }

    public CompareRoutes getCompareRoutesById(String id) {
        String errorMessage = "Not found!";
                return compareRoutesRepository.findById(id)
                        .orElseThrow(() -> new NoSuchElementException(errorMessage));
    }
}

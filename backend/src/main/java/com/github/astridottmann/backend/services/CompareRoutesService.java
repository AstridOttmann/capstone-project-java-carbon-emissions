package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.CompareRoutes;
import com.github.astridottmann.backend.models.ComparisonResults;
import com.github.astridottmann.backend.models.Route;
import com.github.astridottmann.backend.repositories.CompareRoutesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

        CompareRoutes compareRoutesToAdd = new CompareRoutes(
                idCompareRoutes,
                List.of(compared.get(0), compared.get(1)),
                new ComparisonResults(emissionRouteOne, emissionRouteTwo, difference));

        return compareRoutesRepository.save(compareRoutesToAdd);
    }
}

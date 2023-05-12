package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.exceptions.DependencyException;
import com.github.astridottmann.backend.models.*;
import com.github.astridottmann.backend.repositories.CompareRoutesRepository;
import com.github.astridottmann.backend.repositories.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RouteService {
    private final RouteRepository routeRepository;
    private final IdService idService;
    private final CalculateCo2EmissionService calculateCo2EmissionService;
    private final MongoUser user;
    private final CompareRoutesService compareRoutesService;
    private final CompareRoutesRepository compareRoutesRepository;


    public Route addRoute(RouteDTO routeDTO) {
        String id = idService.createRandomId();
        double co2EmissionRoute = calculateCo2EmissionService.calculateCo2EmissionRoute(routeDTO);
        String userId = user.id();

        Route routeToAdd = Route.createRouteFromDTO(routeDTO, id, co2EmissionRoute, userId);
        return routeRepository.save(routeToAdd);
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route getRouteById(String id) {
        String errorMessage = "Route with Id " + id + " not found!";
        return routeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(errorMessage));
    }

    public void deleteRouteById(String id) {
        String errorMessageNoElement = "Couldn't delete route. Id " + id + " doesn't exist";
        String errorMessageDependency = "Cannot delete element " + id + " because it is still referenced by other elements";

        boolean routeExists = routeRepository.existsById(id);
        int listContainedRoutesLength = compareRoutesRepository.findAllByComparedId(id).size();
        boolean routeIsUsedInComparison = routeExists && listContainedRoutesLength > 0;

        if (!routeExists) {
            throw new NoSuchElementException(errorMessageNoElement);
        } else if (routeIsUsedInComparison) {
            throw new DependencyException(errorMessageDependency);
        } else {
            routeRepository.deleteById(id);
        }
    }

    public Route updateRoute(Route route) {
        if (routeRepository.existsById(route.id())) {
            RouteDTO toUpdate = new RouteDTO(route);
            double co2EmissionRoute = calculateCo2EmissionService.calculateCo2EmissionRoute(toUpdate);

            Route updatedRoute = route.withCo2Emission(co2EmissionRoute);
            compareRoutesService.updateAllComparisonContainingRoute(updatedRoute);
            return routeRepository.save(updatedRoute);
        }
        String errorMessage = "Couldn't update route. Id " + route.id() + " doesn't exist";
        throw new NoSuchElementException(errorMessage);
    }
}


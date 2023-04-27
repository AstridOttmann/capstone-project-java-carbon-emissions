package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.*;
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


    public Route addRoute(Route route) {
        Route routeToAdd = route.withId(idService.createRandomId());
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
        String errorMessage = "Couldn't delete route. Id " + id + " doesn't exist";
        if (routeRepository.existsById(id)) {
            routeRepository.deleteById(id);
        } else throw new NoSuchElementException(errorMessage);
    }

    public Route updateRoute(Route route) {
        String errorMessage = "Couldn't update route. Id " + route.id() + " doesn't exist";
        if (routeRepository.existsById(route.id())) {
            return routeRepository.save(route);
        }
        throw new NoSuchElementException(errorMessage);
    }
}
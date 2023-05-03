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
    private final CalculateCo2EmissionService calculateCo2EmissionService;


    public Route addRoute(RouteDTO routeDTO) {
        Route routeToAdd = new Route(
                idService.createRandomId(),
                routeDTO.start(),
                routeDTO.destination(),
                routeDTO.distance(),
                routeDTO.numberOfPersons(),
                routeDTO.oneWay(),
                routeDTO.vehicle(),
                calculateCo2EmissionService.calculateCo2EmissionRoute(routeDTO));

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
            RouteDTO toUpdate = new RouteDTO(
                    route.start(),
                    route.destination(),
                    route.distance(),
                    route.numberOfPersons(),
                    route.oneWay(),
                    route.vehicle());

            Route updatedRoute = new Route(
                    route.id(),
                    route.start(),
                    route.destination(),
                    route.distance(),
                    route.numberOfPersons(),
                    route.oneWay(),
                    route.vehicle(),
                    calculateCo2EmissionService.calculateCo2EmissionRoute(toUpdate));
            return routeRepository.save(updatedRoute);
        }
        throw new NoSuchElementException(errorMessage);
    }
}
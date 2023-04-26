package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.*;
import com.github.astridottmann.backend.repositories.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

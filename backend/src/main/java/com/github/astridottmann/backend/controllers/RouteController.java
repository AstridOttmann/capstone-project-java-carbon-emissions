package com.github.astridottmann.backend.controllers;

import com.github.astridottmann.backend.models.Route;
import com.github.astridottmann.backend.models.RouteDTO;
import com.github.astridottmann.backend.services.RouteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class RouteController {
    private final RouteService routeService;

    @GetMapping
    public List<Route> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @GetMapping("/userId/{userId}")
    public List<Route> getAllByUserId(@PathVariable String userId){
        return routeService.getAllByUserId(userId);
    }

    @GetMapping("/{id}")
    public Route getRouteById(@PathVariable String id) {
        return routeService.getRouteById(id);
    }

    @PostMapping
    public Route addRoute(@RequestBody @Valid RouteDTO routeDTO) {
        return routeService.addRoute(routeDTO);
    }

    @DeleteMapping("/{id}")
    void deleteRouteById(@PathVariable String id) {
        if (id.isBlank()) {
            throw new IllegalArgumentException("Id is empty");
        }
        routeService.deleteRouteById(id);
    }

    @PutMapping("/{id}")
    public Route updateRoute(@PathVariable String id, @RequestBody @Valid Route route) {
        if (!id.equals(route.id())){
            String errorMessage = "Id " + id + " doesn't match with route-id " + route.id();
            throw new IllegalArgumentException(errorMessage);
        }
        return routeService.updateRoute(route);
    }
}

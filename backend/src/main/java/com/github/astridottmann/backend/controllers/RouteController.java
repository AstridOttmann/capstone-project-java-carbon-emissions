package com.github.astridottmann.backend.controllers;

import com.github.astridottmann.backend.models.Route;
import com.github.astridottmann.backend.services.RouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class RouteController {
    private final RouteService routeService;

    @PostMapping
    public Route addRoute(@RequestBody Route route) {
        return routeService.addRoute(route);
    }


}

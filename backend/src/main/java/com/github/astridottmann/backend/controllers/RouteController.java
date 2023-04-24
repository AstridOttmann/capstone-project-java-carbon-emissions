package com.github.astridottmann.backend.controllers;

import com.github.astridottmann.backend.models.Car;
import com.github.astridottmann.backend.models.Route;
import com.github.astridottmann.backend.models.Vehicle;
import com.github.astridottmann.backend.services.RouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class RouteController {
    private final RouteService routeService;

   /* @GetMapping
    public Route getRoute(){
        Vehicle vehicle = new Car( 0.9f, "diesel", "large");
        Route newRoute = new Route("test", "MA", "SP",
                25.0f, 1, false, vehicle, 0.0f);
        return newRoute;
    }*/
    @PostMapping
    public Route addRoute(@RequestBody Route route) {
        return routeService.addRoute(route);
    }


}

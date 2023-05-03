package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.RouteDTO;
import com.github.astridottmann.backend.models.Vehicle;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CalculateCo2EmissionServiceTest {
CalculateCo2EmissionService calculateCo2EmissionService = new CalculateCo2EmissionService();
    @Test
    void calculateCo2EmissionRoute() {
        Vehicle vehicle = new Vehicle("Car", 120);
        RouteDTO route = new RouteDTO("Berlin", "Potsdam", 100, 2,true, vehicle);

        double expectedCo2Emission = vehicle.getCo2Emission() * 100 / 2 / 1000;

        double actualCo2Emission = calculateCo2EmissionService.calculateCo2EmissionRoute(route);
        assertEquals(expectedCo2Emission, actualCo2Emission, 0.01);
    }
}
package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.RouteDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CalculateCo2EmissionService {
    public double calculateCo2EmissionRoute(RouteDTO routeDTO) {
        int distance = routeDTO.oneWay() ? routeDTO.distance() : routeDTO.distance() * 2;

        return routeDTO.vehicle().getCo2Emission() * distance / routeDTO.numberOfPersons() / 1000;
    }
}

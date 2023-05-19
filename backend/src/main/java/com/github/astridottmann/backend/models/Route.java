package com.github.astridottmann.backend.models;

import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;

public record Route(
        @Id
        String id,
        @NotBlank
        @Size(min = 3, max = 25)
        String start,
        @NotBlank
        @Size(min = 3, max = 25)
        String destination,
        @Positive
        int distance,
        @Positive
        int numberOfPersons,
        @NotNull
        boolean oneWay,
        @NotNull
        Vehicle vehicle,
        double co2EmissionRoute,
        String userId
) {
    public static Route createRouteFromDTO(RouteDTO routeDTO, String id, double co2EmissionRoute) {
        return new Route(
                id,
                routeDTO.start(),
                routeDTO.destination(),
                routeDTO.distance(),
                routeDTO.numberOfPersons(),
                routeDTO.oneWay(),
                routeDTO.vehicle(),
                co2EmissionRoute,
                routeDTO.userId());
    }

    public Route withCo2Emission(double co2EmissionRoute) {
        return new Route(id, start,
                destination, distance, numberOfPersons, oneWay, vehicle, co2EmissionRoute, userId);
    }

}

package com.github.astridottmann.backend.models;

import jakarta.validation.constraints.*;


public record RouteDTO(
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
        String userId
) {
    public RouteDTO(Route route) {
        this(route.start(),
                route.destination(),
                route.distance(),
                route.numberOfPersons(),
                route.oneWay(),
                route.vehicle(),
                route.userId());

    }
}

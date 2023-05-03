package com.github.astridottmann.backend.models;

public record RouteDTO(
        String start,
        String destination,
        int distance,
        int numberOfPersons,
        boolean oneWay,
        Vehicle vehicle
) {
    public RouteDTO(Route route) {
        this(route.start(),
                route.destination(),
                route.distance(),
                route.numberOfPersons(),
                route.oneWay(),
                route.vehicle());

    }
}

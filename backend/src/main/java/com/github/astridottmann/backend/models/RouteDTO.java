package com.github.astridottmann.backend.models;

public record RouteDTO(
        String start,
        String destination,
        int distance,
        int numberOfPersons,
        boolean oneWay,
        Vehicle vehicle
) {

}

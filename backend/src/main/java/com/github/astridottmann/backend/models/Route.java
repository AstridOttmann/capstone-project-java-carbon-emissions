package com.github.astridottmann.backend.models;

public record Route(
        String id,
        String start,
        String destination,
        float distance,
        int numberOfPersons,
        boolean oneWay,
        Vehicle vehicle,
        float co2EmissionRoute
) {
    Route(
            String start,
            String destination,
            float distance,
            int numberOfPersons,
            boolean oneWay,
            Vehicle vehicle,
            float co2EmissionRoute
    ) {
        this(null, start,
                destination, distance, numberOfPersons, oneWay, vehicle, co2EmissionRoute);
    }

    public Route withId(String id) {
        return new Route(id, start,
                destination, distance, numberOfPersons, oneWay, vehicle, co2EmissionRoute);
    }
}

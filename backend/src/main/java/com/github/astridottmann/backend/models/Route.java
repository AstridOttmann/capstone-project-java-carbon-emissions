package com.github.astridottmann.backend.models;

import org.springframework.data.annotation.Id;

public record Route(
        @Id
        String id,
        String start,
        String destination,
        int distance,
        int numberOfPersons,
        boolean oneWay,
        Vehicle vehicle,
        double co2EmissionRoute
) {
    public Route(
            String start,
            String destination,
            int distance,
            int numberOfPersons,
            boolean oneWay,
            Vehicle vehicle,
            double co2EmissionRoute
    ) {
        this(null, start, destination, distance, numberOfPersons, oneWay, vehicle, co2EmissionRoute);
    }

    public Route withId(String id) {
        return new Route(id, start,
                destination, distance, numberOfPersons, oneWay, vehicle, co2EmissionRoute);
    }


}

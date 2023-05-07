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
    public static Route createRouteFromDTO(RouteDTO routeDTO, String id, double co2EmissionRoute) {
        return new Route(id,
                routeDTO.start(),
                routeDTO.destination(),
                routeDTO.distance(),
                routeDTO.numberOfPersons(),
                routeDTO.oneWay(),
                routeDTO.vehicle(),
                co2EmissionRoute);
    }

    public Route withCo2Emission(double co2EmissionRoute) {
        return new Route(id, start,
                destination, distance, numberOfPersons, oneWay, vehicle, co2EmissionRoute);
    }

}

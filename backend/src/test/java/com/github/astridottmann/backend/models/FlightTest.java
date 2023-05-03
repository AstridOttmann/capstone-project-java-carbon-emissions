package com.github.astridottmann.backend.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FlightTest {
    private Flight flight;

    @BeforeEach
    public void setUp() {
        flight = new Flight("flight", 271.0);
    }

    @Test
    void testConstructor() {
        assertEquals("flight", flight.getType());
        assertEquals(271.0, flight.getCo2Emission());

    }
}

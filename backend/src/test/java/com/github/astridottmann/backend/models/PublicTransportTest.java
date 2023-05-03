package com.github.astridottmann.backend.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PublicTransportTest {
    private PublicTransport publicTransport;

    @BeforeEach
    public void setUp() {
        publicTransport = new PublicTransport("publicTransport", 86.5, "local", "train");
    }

    @Test
    void testConstructor() {
        assertEquals("publicTransport", publicTransport.getType());
        assertEquals(86.5, publicTransport.getCo2Emission());
        assertEquals("local", publicTransport.getDistanceLevel());
        assertEquals("train", publicTransport.getMeansOfTransport());
    }

    @Test
    void getCo2Emission() {
        Vehicle vehicle = new PublicTransport("PublicTransport", 108.0, "local","bus");

        double expectedCo2Emission = 108.0;

        double actualCo2Emission = vehicle.getCo2Emission();
        assertEquals(expectedCo2Emission, actualCo2Emission, 0.01);
    }
}

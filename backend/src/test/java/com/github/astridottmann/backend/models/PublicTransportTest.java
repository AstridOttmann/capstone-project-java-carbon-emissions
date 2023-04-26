package com.github.astridottmann.backend.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PublicTransportTest {
    private PublicTransport publicTransport;

    @BeforeEach
    public void setUp() {
        publicTransport = new PublicTransport("publicTransport", 0.6, "local", "train");
    }

    @Test
    void testConstructor() {
        assertEquals("publicTransport", publicTransport.getType());
        assertEquals(0.6, publicTransport.getCo2Emission());
        assertEquals("local", publicTransport.getDistanceLevel());
        assertEquals("train", publicTransport.getMeansOfTransport());
    }
}

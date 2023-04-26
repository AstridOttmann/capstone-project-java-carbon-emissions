package com.github.astridottmann.backend.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BikeTest {
    private Bike bike;

    @BeforeEach
    public void setUp() {
        bike = new Bike("bike", 0.0);
    }

    @Test
    void testConstructor() {
        assertEquals("bike", bike.getType());
        assertEquals(0.0, bike.getCo2Emission());

    }
}

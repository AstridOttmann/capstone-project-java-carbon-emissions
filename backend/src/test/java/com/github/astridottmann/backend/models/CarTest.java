package com.github.astridottmann.backend.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CarTest {
    private Car car;

    @BeforeEach
    public void setUp() {
        car = new Car("car", 1.8, "petrol", "medium");
    }

    @Test
    void testConstructor() {
        assertEquals("car", car.getType());
        assertEquals(1.8, car.getCo2Emission());
        assertEquals("petrol", car.getFuel());
        assertEquals("medium", car.getCarSize());
    }

}
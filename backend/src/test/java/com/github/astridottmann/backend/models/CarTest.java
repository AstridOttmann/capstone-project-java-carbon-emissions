package com.github.astridottmann.backend.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CarTest {
    private Car car;

    @BeforeEach
    public void setUp() {
        car = new Car("car", 193.3, "petrol", "medium");
    }

    @Test
    void testConstructor() {
        assertEquals("car", car.getType());
        assertEquals(193.3, car.getCo2Emission());
        assertEquals("petrol", car.getFuel());
        assertEquals("medium", car.getCarSize());
    }

    @Test
    void getCo2Emission() {
            Vehicle vehicle = new Car("Car", 123.3, "diesel","small");

            double expectedCo2Emission = 123.3;

            double actualCo2Emission = vehicle.getCo2Emission();
            assertEquals(expectedCo2Emission, actualCo2Emission, 0.01);
        }
    }

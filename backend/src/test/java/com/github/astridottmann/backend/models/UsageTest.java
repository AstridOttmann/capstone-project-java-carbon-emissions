package com.github.astridottmann.backend.models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UsageTest {

    @Test
    void testUsageConstructorAndGetters() {
        String datetime = "2023-05-18 12:34:56";
        double bonus = 10.5;

        Usage usage = new Usage(datetime, bonus);

        assertEquals(datetime, usage.datetime());
        assertEquals(bonus, usage.bonus());
    }

    @Test
    void testUsageToString() {
        String datetime = "2023-05-18 12:34:56";
        double bonus = 10.5;

        Usage usage = new Usage(datetime, bonus);

        String expectedToString = "Usage[datetime=2023-05-18 12:34:56, bonus=10.5]";
        assertEquals(expectedToString, usage.toString());
    }
}


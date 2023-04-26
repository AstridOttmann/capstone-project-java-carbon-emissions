package com.github.astridottmann.backend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Bike extends Vehicle {
    public Bike(String type, float co2Emission) {
        super(type, co2Emission);
    }
}

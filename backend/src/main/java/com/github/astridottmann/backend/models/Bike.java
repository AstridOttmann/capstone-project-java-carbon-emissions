package com.github.astridottmann.backend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Bike extends Vehicle implements GetCo2EmissionFactor{
    public Bike(String type, double co2Emission) {
        super(type, co2Emission);
    }

    @Override
    public double getCo2Emission() {
        setCo2Emission(0.0);
        return co2Emission;
    }
}

package com.github.astridottmann.backend.models;

import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Car extends Vehicle implements GetCo2EmissionFactor {
    private String fuel;
    private String carSize;

    public Car(String type, double co2Emission, String fuel, String carSize) {
        super(type, co2Emission);
        this.fuel = fuel;
        this.carSize = carSize;
    }

    @Override
    public double getCo2Emission() {
        switch (fuel) {
            case "petrol" -> {
                if (carSize.equals("small")) {
                    setCo2Emission(160.0);
                } else if (carSize.equals("medium")) {
                    setCo2Emission(193.3);
                } else {
                    setCo2Emission(253.3);
                }
            }
            case "diesel" -> {
                if (carSize.equals("small")) {
                    setCo2Emission(123.3);
                } else if (carSize.equals("medium")) {
                    setCo2Emission(173.3);
                } else {
                    setCo2Emission(243.3);
                }
            }
            default -> throw new IllegalStateException("Unexpected value: " + fuel);
        }
        return co2Emission;
    }
}



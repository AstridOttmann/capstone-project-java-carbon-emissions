package com.github.astridottmann.backend.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class PublicTransport extends Vehicle implements GetCo2EmissionFactor {
    @NotBlank
    String distanceLevel;
    @NotBlank
    String meansOfTransport;

    public PublicTransport(String type, double co2Emission, String distanceLevel, String meansOfTransport) {
        super(type, co2Emission);
        this.distanceLevel = distanceLevel;
        this.meansOfTransport = meansOfTransport;
    }

    @Override
    public double getCo2Emission() {
        switch (distanceLevel) {
            case "local" -> {
                if (meansOfTransport.equals("bus")) {
                    setCo2Emission(108.0);
                } else {
                    setCo2Emission(86.5);
                }
            }
            case "long distance" -> {
                if (meansOfTransport.equals("bus")) {
                    setCo2Emission(37.0);
                } else {
                    setCo2Emission(46.0);
                }
            }
            default -> throw new IllegalStateException("Unexpected value: " + distanceLevel);
        }
        return co2Emission;

    }
}

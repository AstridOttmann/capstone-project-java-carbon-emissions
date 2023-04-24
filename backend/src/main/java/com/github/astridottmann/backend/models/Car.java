package com.github.astridottmann.backend.models;

import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Car extends Vehicle {
    private String fuel;
    private String carSize;

   /* public Car(float co2Emission, String fuel, String carSize) {
        super(co2Emission);
        this.fuel = fuel;
        this.carSize = carSize;
    }*/
}

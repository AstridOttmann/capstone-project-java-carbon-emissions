package com.github.astridottmann.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class PublicTransport extends Vehicle {
    String distanceLevel;
    String meansOfTransport;
}

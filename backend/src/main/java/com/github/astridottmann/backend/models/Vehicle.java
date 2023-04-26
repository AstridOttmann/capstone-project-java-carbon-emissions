package com.github.astridottmann.backend.models;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeId;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, visible = true, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Car.class, name = "car"),
        @JsonSubTypes.Type(value = PublicTransport.class, name = "publicTransport"),
        @JsonSubTypes.Type(value = Bike.class, name = "bike"),
        @JsonSubTypes.Type(value = Flight.class, name = "flight")
})
public class Vehicle {
    @JsonTypeId
    protected String type;
    protected double co2Emission;

}


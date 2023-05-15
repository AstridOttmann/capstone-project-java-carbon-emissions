package com.github.astridottmann.backend.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;

public record MongoUser(
        @Id
        String id,
        @NotBlank
        @Size(min = 3, max = 25)
        String username,

        @NotBlank
        @Size(min = 3, max = 25)
        String password,
        double co2Score
) {
    public static MongoUser createMongoUserFromDTO(MongoUserDTO mongoUserDTO, String password) {
        return new MongoUser(
                mongoUserDTO.id(),
                mongoUserDTO.username(),
                password,
                mongoUserDTO.co2Score()
        );
    }
}

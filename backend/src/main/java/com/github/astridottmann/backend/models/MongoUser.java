package com.github.astridottmann.backend.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.With;
import org.springframework.data.annotation.Id;
@With
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
}

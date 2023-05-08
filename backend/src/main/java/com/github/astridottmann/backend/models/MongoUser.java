package com.github.astridottmann.backend.models;

import org.springframework.data.annotation.Id;

public record MongoUser(
        @Id
        String id,
        String username,
        String password
) {
}

package com.github.astridottmann.backend.models;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record CompareRoutesDTO(
        @NotBlank
        String userId,
        List<Route> compared
) {
        public CompareRoutesDTO(CompareRoutes compareRoutes){
                this(compareRoutes.userId(), compareRoutes.compared());
        }
}

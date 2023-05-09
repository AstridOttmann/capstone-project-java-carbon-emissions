package com.github.astridottmann.backend.models;

import org.springframework.data.annotation.Id;

import java.util.List;


public record CompareRoutes(
        @Id
        String id,
        List<Route> compared,
        ComparisonResults comparisonResults
) {
}

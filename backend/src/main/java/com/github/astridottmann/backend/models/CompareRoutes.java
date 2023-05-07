package com.github.astridottmann.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document("compare-routes")
public record CompareRoutes(
        @Id
        String id,
        List<Route> compared,
        ComparisonResults comparisonResults

) {
}

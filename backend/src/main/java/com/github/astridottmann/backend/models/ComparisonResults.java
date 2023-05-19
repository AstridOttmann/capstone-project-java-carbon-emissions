package com.github.astridottmann.backend.models;

import lombok.With;

import java.util.List;
@With
public record ComparisonResults(
        double resultRouteOne,
        double resultRouteTwo,
        List<Usage> usages
) {
}

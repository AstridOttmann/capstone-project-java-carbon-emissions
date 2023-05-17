package com.github.astridottmann.backend.models;

import java.util.List;

public record ComparisonResults(
        double resultRouteOne,
        double resultRouteTwo,
        List<Usage> usages
) {
}

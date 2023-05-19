package com.github.astridottmann.backend.models;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;

@With
public record CompareRoutes(
        @Id
        String id,
        String userId,
        List<Route> compared,
        ComparisonResults comparisonResults
) {
        public static CompareRoutes createCompareRoutesFromDTO(CompareRoutesDTO compareRoutesDTO, String id, ComparisonResults comparisonResults){
                return new CompareRoutes(
                        id,
                        compareRoutesDTO.userId(),
                        compareRoutesDTO.compared(),
                        comparisonResults
                );
        }
}

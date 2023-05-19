package com.github.astridottmann.backend.controllers;

import com.github.astridottmann.backend.models.CompareRoutes;
import com.github.astridottmann.backend.models.CompareRoutesDTO;
import com.github.astridottmann.backend.services.CompareRoutesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compare")
@RequiredArgsConstructor
public class CompareRoutesController {
    private final CompareRoutesService compareRoutesService;

    @GetMapping
    public List<CompareRoutes> getAllCompareRoutes() {
        return compareRoutesService.getAllCompareRoutes();
    }

    @GetMapping("/userId/{userId}")
    public List<CompareRoutes> getAllByUserId(@PathVariable String userId){
        return compareRoutesService.getAllByUserId(userId);
    }

    @GetMapping("/{id}")
    public CompareRoutes getCompareRoutesById(@PathVariable String id) {
        return compareRoutesService.getCompareRoutesById(id);
    }

    @PostMapping
    public CompareRoutes addComparison(@RequestBody CompareRoutesDTO compareRoutesDTO) {
        return compareRoutesService.addComparison(compareRoutesDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteComparisonById(@PathVariable String id) {
        if (id.isBlank()) {
            throw new IllegalArgumentException("Id is empty");
        }
        compareRoutesService.deleteCompareRoutesById(id);
    }

    @PutMapping("/{id}")
    public CompareRoutes updateCompareRoutes(@PathVariable String id, @RequestBody CompareRoutes compareRoutes) {
        if (!id.equals(compareRoutes.id())) {
            String errorMessage = "Id " + id + " doesn't match";
            throw new IllegalArgumentException(errorMessage);
        }
        return compareRoutesService.updateComparison(compareRoutes);
    }

    @PostMapping("/usages/{userId}")
    public List<CompareRoutes> resetAllUsages(@PathVariable String userId){
        return compareRoutesService.resetAllUsages(userId);
    }
}


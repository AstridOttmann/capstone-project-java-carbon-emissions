package com.github.astridottmann.backend.controllers;

import com.github.astridottmann.backend.models.CompareRoutes;
import com.github.astridottmann.backend.models.Route;
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
    public List<CompareRoutes> getAllCompareRoutes(){
        return compareRoutesService.getAllCompareRoutes();
    }

    @GetMapping("/{id}")
    public CompareRoutes getCompareRoutesById(@PathVariable String id){
        return compareRoutesService.getCompareRoutesById(id);
    }

    @PostMapping
    public CompareRoutes addComparison(@RequestBody List<Route> compared){
        return compareRoutesService.addComparison(compared);
    }

}

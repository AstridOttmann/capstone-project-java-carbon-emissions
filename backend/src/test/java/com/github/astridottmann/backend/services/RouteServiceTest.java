package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.*;
import com.github.astridottmann.backend.repositories.RouteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class RouteServiceTest {
    RouteService routeService;
    final IdService idService = mock(IdService.class);

    final RouteRepository routeRepository = mock(RouteRepository.class);
    private final String testId = "1";

    private Route createTestRouteInstance() {
        return new Route(testId,
                "Hamburg",
                "Frankfurt",
                492,
                1,
                false,
                new Car("car", 2.8, "petrol", "large"),
                0.0);
    }

    @BeforeEach
    void init() {
        this.routeService = new RouteService(routeRepository, idService);
    }

    @Test
    void addRoute_shouldReturnAddedRoute() {
        Route routeToAdd = createTestRouteInstance();
        Mockito.when(routeRepository.save(routeToAdd))
                .thenReturn(routeToAdd);
        Mockito.when(idService.createRandomId())
                .thenReturn(testId);

        Route actual = routeService.addRoute(routeToAdd);
        Route expected = createTestRouteInstance();

        verify(routeRepository).save(routeToAdd);
        verify(idService).createRandomId();

        assertEquals(expected, actual);
    }

    @Test
    void getAllRoutes_shouldReturnListOfRoutes() {
        Route testRoute = createTestRouteInstance();
        Mockito.when(routeRepository.findAll())
                .thenReturn(new ArrayList<>(List.of(testRoute)));

        List<Route> actual = routeService.getAllRoutes();

        verify(routeRepository).findAll();
        List<Route> expected = new ArrayList<>(List.of(testRoute));

        assertEquals(expected, actual);
    }

    @Test
    void getAllRoutes_shouldReturnEmptyList_whenRepositoryIsEmpty() {
        Mockito.when(routeRepository.findAll())
                .thenReturn(new ArrayList<>());

        List<Route> actual = routeService.getAllRoutes();

        verify(routeRepository).findAll();
        List<Route> expected = new ArrayList<>();

        assertEquals(expected, actual);
    }
}
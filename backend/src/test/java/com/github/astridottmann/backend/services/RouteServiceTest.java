package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.*;
import com.github.astridottmann.backend.repositories.RouteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    @Test
    void getRouteById_should_returnRequestedRoute(){
        Route requested = createTestRouteInstance();

        Mockito.when(routeRepository.findById(testId))
                .thenReturn(Optional.of(requested));

        Route actual = routeService.getRouteById(testId);

        verify(routeRepository).findById(testId);
        assertEquals(requested, actual);
    }

    @Test
    void getRouteById_shouldThrowException_whenInvalidId(){
        String errorMessage = "Route with Id " + testId + " not found!";

        Mockito.when(routeRepository.findById(testId))
                .thenThrow(new NoSuchElementException(errorMessage));

        Exception exception = assertThrows(NoSuchElementException.class,
                ()-> routeService.getRouteById(testId));

        verify(routeRepository).findById(testId);
        assertEquals(errorMessage, exception.getMessage());
    }

    @Test
    void deleteRouteById_shouldDeleteRoute(){
        Mockito.when(routeRepository.existsById(testId))
                .thenReturn(true);

        routeService.deleteRouteById(testId);

        verify(routeRepository).existsById(testId);
    }

    @Test
    void deleteRouteById_shouldThrowException_whenInvalidId(){
        String id = "123";
        String errorMessage = "Couldn't delete delivery. Id " + id + " doesn't exist";

        Mockito.when(routeRepository.existsById(id))
                .thenReturn(false);

        Exception exception = assertThrows(IllegalArgumentException.class,
                ()-> routeService.deleteRouteById(id));

        verify(routeRepository).existsById(id);
        assertEquals(errorMessage, exception.getMessage());

    }
}
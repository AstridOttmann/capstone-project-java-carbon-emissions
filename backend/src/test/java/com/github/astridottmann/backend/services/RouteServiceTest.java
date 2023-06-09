package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.*;
import com.github.astridottmann.backend.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class RouteServiceTest {
    RouteService routeService;
    final IdService idService = mock(IdService.class);
    final CalculateCo2EmissionService calculateCo2EmissionService = mock(CalculateCo2EmissionService.class);
    final CompareRoutesService compareRoutesService = mock(CompareRoutesService.class);
    final MongoUserDetailsService mongoUserDetailsService = mock(MongoUserDetailsService.class);
    final RouteRepository routeRepository = mock(RouteRepository.class);
    private final String testId = "1";
    private final double dummyEmission = 162;

    private Route createTestRouteInstance() {
        Car car = new Car("car", 2.8, "petrol", "large");
        return new Route(testId,
                "Hamburg",
                "Frankfurt",
                492,
                1,
                false,
                car,
                dummyEmission,
                "a1b2");
    }

    private RouteDTO createTestRouteDTOInstance() {
        Car car = new Car("car", 2.8, "petrol", "large");
        return new RouteDTO(
                "Hamburg",
                "Frankfurt",
                492,
                1,
                false,
                car,
                "a1b2");
    }

    @BeforeEach
    void init() {
        this.routeService = new RouteService(
                routeRepository, idService, calculateCo2EmissionService, compareRoutesService, mongoUserDetailsService);
    }

    @Test
    void addRoute_shouldReturnAddedRoute() {
        RouteDTO routeToAddDTO = createTestRouteDTOInstance();
        Route routeToAdd = createTestRouteInstance();

        Mockito.when(routeRepository.save(routeToAdd))
                .thenReturn(routeToAdd);
        Mockito.when(idService.createRandomId())
                .thenReturn(testId);
        Mockito.when(calculateCo2EmissionService.calculateCo2EmissionRoute(routeToAddDTO))
                .thenReturn(dummyEmission);

        Route actual = routeService.addRoute(routeToAddDTO);
        Route expected = createTestRouteInstance();

        verify(routeRepository).save(routeToAdd);
        verify(idService).createRandomId();
        verify(calculateCo2EmissionService).calculateCo2EmissionRoute(routeToAddDTO);

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
    void getAllByUserId_shouldReturnFilteredRoutes() {
        Route testRoute = createTestRouteInstance();
        String userId = "a1b2";

        Mockito.when(mongoUserDetailsService.existsById(userId))
                .thenReturn(true);
        Mockito.when(routeRepository.findAllByUserId(userId))
                .thenReturn(new ArrayList<>(List.of(testRoute)));

        List<Route> actual = routeService.getAllByUserId(userId);
        List<Route> expected = new ArrayList<>(List.of(testRoute));

        verify(mongoUserDetailsService).existsById(userId);
        verify(routeRepository).findAllByUserId(userId);
        assertEquals(expected, actual);
    }

    @Test
    void getAllByUserId_shouldThrowException_whenUserDoesntExist() {
        String userId = "aabb";
        String errorMessage = "Unable to load data. User not found!";

        Mockito.when(mongoUserDetailsService.existsById(userId))
                .thenReturn(false);

        Exception exception = assertThrows(NoSuchElementException.class,
                () -> routeService.getAllByUserId(userId));

        verify(mongoUserDetailsService).existsById(userId);
        assertEquals(errorMessage, exception.getMessage());
    }

    @Test
    void getRouteById_should_returnRequestedRoute() {
        Route requested = createTestRouteInstance();

        Mockito.when(routeRepository.findById(testId))
                .thenReturn(Optional.of(requested));

        Route actual = routeService.getRouteById(testId);

        verify(routeRepository).findById(testId);
        assertEquals(requested, actual);
    }

    @Test
    void getRouteById_shouldThrowException_whenInvalidId() {
        String errorMessage = "Route with Id " + testId + " not found!";

        Mockito.when(routeRepository.findById(testId))
                .thenThrow(new NoSuchElementException(errorMessage));

        Exception exception = assertThrows(NoSuchElementException.class,
                () -> routeService.getRouteById(testId));

        verify(routeRepository).findById(testId);
        assertEquals(errorMessage, exception.getMessage());
    }

    @Test
    void deleteRouteById_shouldDeleteRoute() {
        Mockito.when(routeRepository.existsById(testId))
                .thenReturn(true);

        routeService.deleteRouteById(testId);

        verify(routeRepository).existsById(testId);
    }

    @Test
    void deleteRouteById_shouldThrowException_whenInvalidId() {
        String id = "123";
        String errorMessage = "Couldn't delete route. Id " + id + " doesn't exist";

        Mockito.when(routeRepository.existsById(id))
                .thenReturn(false);

        Exception exception = assertThrows(NoSuchElementException.class,
                () -> routeService.deleteRouteById(id));

        verify(routeRepository).existsById(id);
        assertEquals(errorMessage, exception.getMessage());
    }

    @Test
    void updateRoute_shouldReturnUpdatedRoute() {
        Route routeToUpdate = createTestRouteInstance();
        RouteDTO routeToUpdateDTO = createTestRouteDTOInstance();

        Mockito.when(routeRepository.existsById(routeToUpdate.id()))
                .thenReturn(true);
        Mockito.when(calculateCo2EmissionService.calculateCo2EmissionRoute(routeToUpdateDTO))
                .thenReturn(dummyEmission);
        Mockito.when(routeRepository.save(routeToUpdate))
                .thenReturn(routeToUpdate);

        Route actual = routeService.updateRoute(routeToUpdate);
        Route expected = createTestRouteInstance();

        verify(routeRepository).existsById(routeToUpdate.id());
        verify(routeRepository).save(routeToUpdate);
        verify(calculateCo2EmissionService).calculateCo2EmissionRoute(routeToUpdateDTO);
        assertEquals(expected, actual);
    }

    @Test
    void updateRoute_shouldThrowNoSuchElementException_whenIdNotExists() {
        Route routeToUpdate = createTestRouteInstance();
        String errorMessage = "Couldn't update route. Id " + routeToUpdate.id() + " doesn't exist.";

        Mockito.when(routeRepository.existsById(routeToUpdate.id()))
                .thenReturn(false);

        Exception exception = assertThrows(NoSuchElementException.class,
                () -> routeService.updateRoute(routeToUpdate));

        verify(routeRepository).existsById(routeToUpdate.id());
        assertEquals(errorMessage, exception.getMessage());
    }

}
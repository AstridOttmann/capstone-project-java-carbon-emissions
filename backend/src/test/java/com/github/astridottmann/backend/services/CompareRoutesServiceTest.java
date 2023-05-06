package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.*;
import com.github.astridottmann.backend.repositories.CompareRoutesRepository;
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

class CompareRoutesServiceTest {
    CompareRoutesService compareRoutesService;
    final IdService idService = mock(IdService.class);
    final CompareRoutesRepository compareRoutesRepository = mock(CompareRoutesRepository.class);
    private final String testId = "1";

    private CompareRoutes createTestCompareRoutesInstance() {
        Car car = new Car("car", 253.3, "petrol", "large");
        Route routeA = new Route(
                "123",
                "Hamburg",
                "Frankfurt",
                492,
                1,
                false,
                car,
                268.93);

        PublicTransport publicTransport = new PublicTransport("publicTransport", 46.0, "longDistance", "train");
        Route routeB = new Route(
                "456",
                "Hamburg",
                "Frankfurt",
                492,
                1,
                false,
                publicTransport,
                45.26);

        return new CompareRoutes(
                testId,
                List.of(routeA, routeB),
                new ComparisonResults(268.93, 45.26, 223.67)
        );
    }

    @BeforeEach
    void init() {
        this.compareRoutesService = new CompareRoutesService(compareRoutesRepository, idService);
    }

    @Test
    void addComparison() {
        CompareRoutes testCompareRoutes = createTestCompareRoutesInstance();
        List<Route> testCompared = testCompareRoutes.compared();

        Mockito.when(compareRoutesRepository.save(testCompareRoutes))
                .thenReturn(testCompareRoutes);
        Mockito.when(idService.createRandomId())
                .thenReturn(testId);

        CompareRoutes actual = compareRoutesService.addComparison(testCompared);

        verify(compareRoutesRepository).save(testCompareRoutes);
        assertEquals(testCompareRoutes, actual);

    }

    @Test
    void getAllCompareRoutes_shouldReturnAllCompareRoutesFromRepository() {
        CompareRoutes testCompareRoutes = createTestCompareRoutesInstance();

        Mockito.when(compareRoutesRepository.findAll())
                .thenReturn(new ArrayList<>(List.of(testCompareRoutes)));

        List<CompareRoutes> actual = compareRoutesService.getAllCompareRoutes();
        List<CompareRoutes> expected = new ArrayList<>(List.of(testCompareRoutes));

        verify(compareRoutesRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getAllCompareRoutes_shouldReturnEmptyList_whenRepositoryIsEmpty() {
        Mockito.when(compareRoutesRepository.findAll())
                .thenReturn(new ArrayList<>(List.of()));

        List<CompareRoutes> actual = compareRoutesService.getAllCompareRoutes();
        List<CompareRoutes> expected = new ArrayList<>(List.of());

        verify(compareRoutesRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getCompareRoutesById_shouldReturnRequested() {
        CompareRoutes requested = createTestCompareRoutesInstance();
        Mockito.when(compareRoutesRepository.findById(testId))
                .thenReturn(Optional.of(requested));

        CompareRoutes actual = compareRoutesService.getCompareRoutesById(testId);

        verify(compareRoutesRepository).findById(testId);
        assertEquals(requested, actual);
    }

    @Test
    void getCompareRoutesById_shouldThrowException_whenInvalidId() {
        String errorMessage = "Not found!";
        Mockito.when(compareRoutesRepository.findById(testId))
                .thenThrow(new NoSuchElementException(errorMessage));

        Exception exception = assertThrows(NoSuchElementException.class,
                () -> compareRoutesService.getCompareRoutesById(testId));

        verify(compareRoutesRepository).findById(testId);
        assertEquals(errorMessage, exception.getMessage());
    }

    @Test
    void deleteCompareRoutesById_shouldDeleteRequested() {
        CompareRoutes toDelete = createTestCompareRoutesInstance();
        compareRoutesRepository.save(createTestCompareRoutesInstance());

        Mockito.when(compareRoutesRepository.existsById(toDelete.id()))
                .thenReturn(true);

        compareRoutesService.deleteCompareRoutesById(toDelete.id());
        verify(compareRoutesRepository).existsById(toDelete.id());
    }

    @Test
    void deleteCompareRoutes_shouldThrowException_whenInvalidId() {
        String errorMessage = "Could not delete. Id 123 doesn't exist";

        Mockito.when(compareRoutesRepository.existsById("123"))
                .thenReturn(false);

        Exception exception = assertThrows(NoSuchElementException.class,
                () -> compareRoutesService.deleteCompareRoutesById("123"));

        verify(compareRoutesRepository).existsById("123");
        assertEquals(errorMessage, exception.getMessage());

    }
}
package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.*;
import com.github.astridottmann.backend.repositories.CompareRoutesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class CompareRoutesServiceTest {
    CompareRoutesService compareRoutesService;
    final IdService idService = mock(IdService.class);
    final CompareRoutesRepository compareRoutesRepository = mock(CompareRoutesRepository.class);
    private final String testId = "1";

    private CompareRoutes createTestCompareRoutesInstance() {
        return new CompareRoutes(
                testId,
                List.of(new Route("123",
                                "Hamburg",
                                "Frankfurt",
                                492,
                                1,
                                false,
                                new Car("car", 243.3, "petrol", "large"),
                                268.93),
                        new Route("456",
                                "Hamburg",
                                "Frankfurt",
                                492,
                                1,
                                false,
                                new PublicTransport("publicTransport", 46.0, "longDistance", "train"),
                                45.26)),
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
}
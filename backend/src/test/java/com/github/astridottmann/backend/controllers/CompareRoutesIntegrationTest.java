package com.github.astridottmann.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.astridottmann.backend.models.*;
import com.github.astridottmann.backend.repositories.CompareRoutesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class CompareRoutesIntegrationTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    private CompareRoutesRepository compareRoutesRepository;
    @Autowired
    private ObjectMapper objectMapper;
    private CompareRoutes testCompareRoutes;
    private String testCompareRoutesJson;
    private String testCompareRoutesWithoutIdJson;
    private String expectedBodyJson;
    private String testComparedJson;

    @BeforeEach
    void setUp() throws Exception {
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

        testCompareRoutes = new CompareRoutes(
                "999",
                List.of(routeA, routeB),
                new ComparisonResults(268.93, 45.26, 223.67)
        );
        testCompareRoutesJson = objectMapper.writeValueAsString(testCompareRoutes);

     /*   testCompareRoutesWithoutId = new CompareRoutes(
                List.of(routeA, routeB),
                new ComparisonResults(268.93, 45.26, 223.67));

        testCompareRoutesWithoutIdJson = objectMapper.writeValueAsString(testCompareRoutesWithoutId);*/

        List<Route> testCompared = new ArrayList<>(List.of(routeA, routeB));
        testComparedJson = objectMapper.writeValueAsString(testCompared);

        testCompareRoutesWithoutIdJson = """
                 { "compared": [
                            {
                                "id": "123",
                                "start": "Hamburg",
                                "destination": "Frankfurt",
                                "distance": 492,
                                "numberOfPersons": 1,
                                "oneWay": false,
                                "vehicle": {
                                    "type": "car",
                                    "co2Emission": 253.3,
                                    "fuel": "petrol",
                                    "carSize": "large"
                                },
                                "co2EmissionRoute": 268.93
                            },
                            {
                                "id": "456",
                                "start": "Hamburg",
                                "destination": "Frankfurt",
                                "distance": 492,
                                "numberOfPersons": 1,
                                "oneWay": false,
                                "vehicle": {
                                    "type": "publicTransport",
                                    "co2Emission": 46.0,
                                    "distanceLevel": "longDistance",
                                    "meansOfTransport": "train"
                                },
                                "co2EmissionRoute": 45.26
                            }
                        ],
                     "comparisonResults": {
                            "resultRouteOne": 268.93,
                            "resultRouteTwo": 45.26,
                            "difference": 223.67
                        }
                    }
                """;
    }

    @Test
    void getAllCompareRoutes_shouldReturnAllCompareRoutesFromTheRepository() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);
        List<CompareRoutes> expectedBody = new ArrayList<>(List.of(testCompareRoutes));
        expectedBodyJson = objectMapper.writeValueAsString(expectedBody);

        mockMvc.perform(get("/api/compare"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBodyJson));
    }

    @Test
    void getAllCompareRoutes_shouldReturnEmptyList_whenRepositoryIsEmpty() throws Exception {
        mockMvc.perform(get("/api/compare"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    void getCompareRoutesById_shouldReturnRequested() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);

        mockMvc.perform(get("/api/compare/" + testCompareRoutes.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(testCompareRoutesJson));
    }

    @Test
    void getCompareRoutesById_shouldThrowException_whenIdInvalid() throws Exception {
        String errorMessage = "{\"message\":  \"Not found!\"}";
        mockMvc.perform((get("/api/compare/" + testCompareRoutes.id())))
                .andExpect(status().isNotFound())
                .andExpect(content().json(errorMessage))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    void addComparison_shouldAddComparisonToRepository() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);
        String addedCompareRoutesJson =
                mockMvc.perform(post("/api/compare")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(testComparedJson))
                        .andExpect(status().isOk())
                        .andExpect(content().json(testCompareRoutesWithoutIdJson))
                        .andExpect(jsonPath("$.id").isNotEmpty())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();

        CompareRoutes actual = objectMapper.readValue(addedCompareRoutesJson, CompareRoutes.class);
        //CompareRoutes expected = testCompareRoutes.withId(actual.id());

        CompareRoutes expected = new CompareRoutes(
                actual.id(),
                testCompareRoutes.compared(),
                testCompareRoutes.comparisonResults()
        );
        assertThat(compareRoutesRepository.findAll()).contains(expected);
    }

    @Test
    void deleteCompareRoutesById_shouldDeleteCompareRoutes() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);

        mockMvc.perform(delete("/api/compare/" + testCompareRoutes.id()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/compare"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    void deleteCompareRoutesById_shouldThrowApiErrorAndStatusNotFound_whenIdNotExists() throws Exception {
        String errorMessage = "{\"message\": \"Could not delete. Id " + testCompareRoutes.id() + " doesn't exist\"}";
        mockMvc.perform(delete("/api/compare/" + testCompareRoutes.id()))
                .andExpect(status().isNotFound())
                .andExpect(content().json(errorMessage))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    void deleteCompareRoutesById_shouldThrowApiErrorAndStatusUnprocessable_whenIdIsBlank() throws Exception {
        String id = " ";
        String errorMessage = "{\"message\": \"Id is empty\"}";
        mockMvc.perform(delete("/api/compare/" + id))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(content().json(errorMessage))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    void updateCompareRoutes_shouldReturnUpdatedCompareRoutes() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);

        mockMvc.perform(put("/api/compare/" + testCompareRoutes.id(), testCompareRoutes)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testCompareRoutesJson))
                .andExpect(status().isOk())
                .andExpect(content().json(testCompareRoutesJson));
    }
}

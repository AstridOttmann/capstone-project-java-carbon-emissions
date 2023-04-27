package com.github.astridottmann.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.astridottmann.backend.models.PublicTransport;
import com.github.astridottmann.backend.models.Route;
import com.github.astridottmann.backend.repositories.RouteRepository;
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
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class RouteIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    private RouteRepository routeRepository;
    @Autowired
    private ObjectMapper objectMapper;
    private Route testRoute;
    private String testRouteJson;
    private String testRouteWithoutIdJson;

    @BeforeEach
    void setUp() throws Exception {
        testRoute = new Route(
                "123",
                "Hamburg",
                "Berlin",
                289,
                1,
                false,
                new PublicTransport("publicTransport",
                        1.2,
                        "longDistance",
                        "train"),
                0.0);
        testRouteJson = objectMapper.writeValueAsString(testRoute);

        testRouteWithoutIdJson = """ 
                {
                "start":"Hamburg", "destination":"Berlin", "distance": 289, "numberOfPersons": 1, "oneWay": false, "vehicle": {"type": "publicTransport", "co2Emission": 1.2, "distanceLevel": "longDistance", "meansOfTransport": "train"}, "co2EmissionRoute": 0.0
                }
                                """;
    }

    @Test
    void getAllRoutes_shouldReturnEmptyList_whenRepositoryIsEmpty() throws Exception {
        mockMvc.perform(get("/api/routes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    void getRouteById_shouldReturnRequestedRoute() throws Exception {
        routeRepository.save(testRoute);
        mockMvc.perform(get("/api/routes/" + testRoute.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(testRouteJson));
    }

    @Test
    void getRouteById_shouldThrowException_whenInvalidId() throws Exception {
        String expectedBody = "{ \"message\": \"Route with Id " + testRoute.id() + " not found!\"}";
        mockMvc.perform(get("/api/routes/" + testRoute.id()))
                .andExpect(status().isNotFound())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    void addRoute_shouldAddRouteToRepository() throws Exception {
        String addedRouteJson =
                mockMvc.perform(post("/api/routes")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(testRouteWithoutIdJson))
                        .andExpect(status().isOk())
                        .andExpect(content().json(testRouteWithoutIdJson))
                        .andExpect(jsonPath("$.id").isNotEmpty())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();

        Route actual = objectMapper.readValue(addedRouteJson, Route.class);
        Route expected = new Route(
                actual.id(),
                testRoute.start(),
                testRoute.destination(),
                testRoute.distance(),
                testRoute.numberOfPersons(),
                testRoute.oneWay(),
                testRoute.vehicle(),
                testRoute.co2EmissionRoute());

        assertThat(routeRepository.findAll()).contains(expected);
    }

    @Test
    void deleteRouteById_shouldRemoveRouteFromRepository() throws Exception {
        routeRepository.save(testRoute);

        mockMvc.perform(delete("/api/routes/" + testRoute.id()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/routes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    void deleteRouteById_shouldReturnApiErrorAndStatusIsNotFound_whenIdNotExists() throws Exception {
        String expectedBody = "{\"message\": \"Couldn't delete delivery. Id " + testRoute.id() + " doesn't exist\"}";

        mockMvc.perform(delete("/api/routes/" + testRoute.id()))
                .andExpect(status().isNotFound())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    void DeleteRouteById_shouldReturnApiErrorAndStatusIsUnprocessable_whenIdIsWhitespace() throws Exception {
        String id = " ";
        String expectedBody = "{\"message\":  \"Id is empty\"}";

        mockMvc.perform(delete("/api/routes/" + id))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }
}
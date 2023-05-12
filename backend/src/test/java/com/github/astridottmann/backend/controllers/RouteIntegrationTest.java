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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
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
        PublicTransport publicTransport = new PublicTransport("publicTransport", 46.0, "longDistance", "train");
        testRoute = new Route(
                "123",
                "Hamburg",
                "Berlin",
                289,
                1,
                false,
                publicTransport,
                26.59);

        testRouteJson = objectMapper.writeValueAsString(testRoute);

        testRouteWithoutIdJson = """ 
                {
                "start":"Hamburg", "destination":"Berlin", "distance": 289, "numberOfPersons": 1, "oneWay": false, "vehicle": {"type": "publicTransport", "co2Emission": 46.0, "distanceLevel": "longDistance", "meansOfTransport": "train"}
                }
                                """;
    }

    @Test
    @WithMockUser
    void getAllRoutes_shouldReturnEmptyList_whenRepositoryIsEmpty() throws Exception {
        mockMvc.perform(get("/api/routes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    void expect401_OnGet_whenAnonymousUser() throws Exception {
        mockMvc.perform(get("/api/routes"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void getRouteById_shouldReturnRequestedRoute() throws Exception {
        routeRepository.save(testRoute);
        mockMvc.perform(get("/api/routes/" + testRoute.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(testRouteJson));
    }

    @Test
    @WithMockUser
    void getRouteById_shouldThrowException_whenInvalidId() throws Exception {
        String expectedBody = "{ \"message\": \"Route with Id " + testRoute.id() + " not found!\"}";
        mockMvc.perform(get("/api/routes/" + testRoute.id()))
                .andExpect(status().isNotFound())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser
    void addRoute_shouldAddRouteToRepository() throws Exception {
        String addedRouteJson =
                mockMvc.perform(post("/api/routes")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(testRouteWithoutIdJson)
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(content().json(testRouteWithoutIdJson))
                        .andExpect(jsonPath("$.id").isNotEmpty())
                        .andExpect(jsonPath("$.co2EmissionRoute").isNotEmpty())
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
                actual.co2EmissionRoute());

        assertThat(routeRepository.findAll()).contains(expected);
    }

    @Test
    @WithMockUser
    void deleteRouteById_shouldRemoveRouteFromRepository() throws Exception {
        routeRepository.save(testRoute);

        mockMvc.perform(delete("/api/routes/" + testRoute.id())
                        .with(csrf()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/routes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @WithMockUser
    void deleteRouteById_shouldReturnApiErrorAndStatusIsNotFound_whenIdNotExists() throws Exception {
        String expectedBody = "{\"message\": \"Couldn't delete route. Id " + testRoute.id() + " doesn't exist\"}";

        mockMvc.perform(delete("/api/routes/" + testRoute.id())
                        .with(csrf()))
                .andExpect(status().isNotFound())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser
    void DeleteRouteById_shouldReturnApiErrorAndStatusIsUnprocessable_whenIdIsWhitespace() throws Exception {
        String id = " ";
        String expectedBody = "{\"message\":  \"Id is empty\"}";

        mockMvc.perform(delete("/api/routes/" + id)
                        .with(csrf()))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser
    void updateRoute_shouldUpdateRouteInRepository() throws Exception {
        routeRepository.save(testRoute);

        mockMvc.perform(put("/api/routes/" + testRoute.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testRouteJson)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(testRouteJson));
    }

    @Test
    @WithMockUser
    void updateRoute_shouldThrowApiErrorAndStatusIsUnprocessable_whenBodyIdAndRouteIdAreNotEqual() throws Exception {
        String urlId = "1";
        routeRepository.save(testRoute);
        String expectedBody = "{\"message\": \"Id " + urlId + " doesn't match with route-id " + testRoute.id() + "\"}";

        mockMvc.perform(put("/api/routes/" + urlId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testRouteJson)
                        .with(csrf()))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }
}
package com.github.astridottmann.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class RouteIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    void getAllRoutes_shouldReturnEmptyList_whenRepositoryIsEmpty() throws Exception {
        mockMvc.perform(get("/api/routes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    void addRoute_shouldReturnAddedRoute() throws Exception {
        mockMvc.perform(post("/api/routes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                  {"start":"Hamburg",
                                   "destination":"Frankfurt",
                                   "distance": 492,
                                   "numberOfPersons": 1,
                                   "oneWay": false,
                                   "vehicle": {
                                   "type": "car", "co2Emission": 2.8,"fuel": "petrol", "carSize": "large"}, 
                                   "co2EmissionRoute": 0.0}
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                          {"start":"Hamburg",
                          "destination":"Frankfurt",
                          "distance": 492,
                          "numberOfPersons": 1,
                          "oneWay": false,
                          "vehicle": {
                          "type": "car", "co2Emission": 2.8, "fuel": "petrol", "carSize": "large"},
                          "co2EmissionRoute": 0.0}
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }
}


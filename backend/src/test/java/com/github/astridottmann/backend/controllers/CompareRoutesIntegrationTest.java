package com.github.astridottmann.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.astridottmann.backend.models.*;
import com.github.astridottmann.backend.repositories.CompareRoutesRepository;
import com.github.astridottmann.backend.repositories.MongoUserRepository;
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

import java.util.ArrayList;
import java.util.Collections;
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
    private MongoUserRepository mongoUserRepository;
    @Autowired
    private ObjectMapper objectMapper;
    private CompareRoutes testCompareRoutes;
    private String testCompareRoutesJson;
    private String testCompareRoutesDTOJson;
    private CompareRoutesDTO testCompareRoutesDTO;
    private String expectedBodyJson;

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
                268.93,
                "a1b2");

        PublicTransport publicTransport = new PublicTransport("publicTransport", 46.0, "long distance", "train");
        Route routeB = new Route(
                "456",
                "Hamburg",
                "Frankfurt",
                492,
                1,
                false,
                publicTransport,
                45.26,
                "a1b2");

        testCompareRoutes = new CompareRoutes(
                "999",
                "a1b2",
                List.of(routeA, routeB),
                new ComparisonResults(223.67, -223.67, Collections.emptyList())
        );
        testCompareRoutesJson = objectMapper.writeValueAsString(testCompareRoutes);

        testCompareRoutesDTO = new CompareRoutesDTO(
                "a1b2",
                List.of(routeA, routeB)
        );
        testCompareRoutesDTOJson = objectMapper.writeValueAsString(testCompareRoutesDTO);
    }

    @Test
    @WithMockUser
    void getAllCompareRoutes_shouldReturnAllCompareRoutesFromTheRepository() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);
        List<CompareRoutes> expectedBody = new ArrayList<>(List.of(testCompareRoutes));
        expectedBodyJson = objectMapper.writeValueAsString(expectedBody);

        mockMvc.perform(get("/api/compare"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBodyJson));
    }

    @Test
    @WithMockUser
    void getAllCompareRoutes_shouldReturnEmptyList_whenRepositoryIsEmpty() throws Exception {
        mockMvc.perform(get("/api/compare"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    void expect401_OnGet_whenAnonymousUser() throws Exception {
        mockMvc.perform(get("/api/compare"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void getAllByUserId_shouldReturnFilteredCompareRoutes() throws Exception {
        MongoUser testUser = new MongoUser("a1b2", "testUser", "", 0);
        mongoUserRepository.save(testUser);
        compareRoutesRepository.save(testCompareRoutes);

        List<CompareRoutes> expectedList = new ArrayList<>(List.of(testCompareRoutes));
        String expectedListJson = objectMapper.writeValueAsString(expectedList);

        mockMvc.perform(get("/api/compare/userId/" + testCompareRoutes.userId()))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedListJson));
    }
    @Test
    @WithMockUser
    void getCompareRoutesById_shouldReturnRequested() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);

        mockMvc.perform(get("/api/compare/" + testCompareRoutes.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(testCompareRoutesJson));
    }

    @Test
    @WithMockUser
    void getCompareRoutesById_shouldThrowException_whenIdInvalid() throws Exception {
        String errorMessage = "{\"message\":  \"Not found!\"}";
        mockMvc.perform((get("/api/compare/" + testCompareRoutes.id())))
                .andExpect(status().isNotFound())
                .andExpect(content().json(errorMessage))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser
    void addComparison_shouldAddComparisonToRepository() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);
        String addedCompareRoutesJson =
                mockMvc.perform(post("/api/compare")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(testCompareRoutesDTOJson)
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(content().json(testCompareRoutesDTOJson))
                        .andExpect(jsonPath("$.id").isNotEmpty())
                        .andExpect(jsonPath("$.comparisonResults").isNotEmpty())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();

        CompareRoutes actual = objectMapper.readValue(addedCompareRoutesJson, CompareRoutes.class);

        CompareRoutes expected = new CompareRoutes(
                actual.id(),
                testCompareRoutes.userId(),
                testCompareRoutes.compared(),
                testCompareRoutes.comparisonResults()
        );
        assertThat(compareRoutesRepository.findAll()).contains(expected);
    }

    @Test
    @WithMockUser
    void deleteCompareRoutesById_shouldDeleteCompareRoutes() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);

        mockMvc.perform(delete("/api/compare/" + testCompareRoutes.id())
                        .with(csrf()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/compare"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @WithMockUser
    void deleteCompareRoutesById_shouldThrowApiErrorAndStatusNotFound_whenIdNotExists() throws Exception {
        String errorMessage = "{\"message\": \"Could not delete. Id " + testCompareRoutes.id() + " doesn't exist\"}";
        mockMvc.perform(delete("/api/compare/" + testCompareRoutes.id())
                        .with(csrf()))
                .andExpect(status().isNotFound())
                .andExpect(content().json(errorMessage))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser
    void deleteCompareRoutesById_shouldThrowApiErrorAndStatusUnprocessable_whenIdIsBlank() throws Exception {
        String id = " ";
        String errorMessage = "{\"message\": \"Id is empty\"}";
        mockMvc.perform(delete("/api/compare/" + id)
                        .with(csrf()))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(content().json(errorMessage))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser
    void updateCompareRoutes_shouldReturnUpdatedCompareRoutes() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);

        mockMvc.perform(put("/api/compare/" + testCompareRoutes.id(), testCompareRoutes)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testCompareRoutesJson)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(testCompareRoutesJson));
    }

    @Test
    @WithMockUser
    void updateCompareRoutes_shouldThrowApiErrorAndStatusIsUnprocessable_whenBodyIdAndCompareRoutesIdAreNotEqual() throws Exception {
        String urlId = "1";
        compareRoutesRepository.save(testCompareRoutes);
        String expectedBody = "{\"message\": \"Id " + urlId + " doesn't match\"}";

        mockMvc.perform(put("/api/compare/" + urlId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testCompareRoutesJson)
                        .with(csrf()))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser
    void resetAllUsages_shouldResetAllUsages() throws Exception {
        compareRoutesRepository.save(testCompareRoutes);
        List<CompareRoutes> expectedBody = new ArrayList<>(List.of(testCompareRoutes));
        expectedBodyJson = objectMapper.writeValueAsString(expectedBody);
        MongoUser testUser = new MongoUser("a1b2", "testUser", "", 0);

        mockMvc.perform(post("/api/compare/usages/" + testUser.id())
                .contentType(MediaType.APPLICATION_JSON)
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBodyJson));
    }
}

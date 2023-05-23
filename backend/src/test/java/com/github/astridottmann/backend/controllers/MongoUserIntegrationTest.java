package com.github.astridottmann.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.astridottmann.backend.models.*;

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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class MongoUserIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    MongoUserRepository mongoUserRepository;

    @Autowired
    private ObjectMapper objectMapper;
    private MongoUser testUser;
    private MongoUserDTO testUserDTO;
    private String testUserJson;
    private String testUserDTOJson;

    @BeforeEach
    void setUp() throws Exception {
        testUser = new MongoUser("123", "testUser", "12345678", 0);
        testUserJson = objectMapper.writeValueAsString(testUser);

        testUserDTO = new MongoUserDTO("123", "testUser", 0);
        testUserDTOJson = objectMapper.writeValueAsString(testUserDTO);
    }

    @Test
    @WithMockUser(username = "testUser")
    void getMe_shouldReturnUser() throws Exception {
        mongoUserRepository.save(testUser);
        mockMvc.perform(get("/api/user/me"))
                .andExpect(status().isOk())
                .andExpect(content().json(testUserDTOJson));

    }

    @Test
    @WithMockUser(username = "testUser")
    void login_shouldReturnUser() throws Exception {
        mongoUserRepository.save(testUser);
        mockMvc.perform(post("/api/user/login")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(testUserDTOJson));

    }

    @Test
    @WithMockUser(username = "testUser")
    void login_shouldFail_whenUserIsUnauthorized() throws Exception {
        mockMvc.perform(post("/api/user/login"))
                .andExpect(status().isForbidden())
                .andExpect(content().string(""));
    }


    @Test
    @WithMockUser(username = "testUser")
    void logout_shouldLogoutUser() throws Exception {
        mockMvc.perform(post("/api/user/logout")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }

    @Test
    @WithMockUser
    void signIn_shouldReturnANewUser() throws Exception {
        mockMvc.perform(post("/api/user/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testUserJson)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"username":  "testUser", "co2Score": 0}
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.password").isNotEmpty());
    }

    @Test
    @WithMockUser
    void signIn_shouldReturnApiErrorAndStatusIsUnprocessable_whenUsernameAlreadyExists() throws Exception {
        mongoUserRepository.save(testUser);
        String expectedMessage = "Username already exists!";

        mockMvc.perform(post("/api/user/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "username": "testUser", "password": "egal"}
                                 """)
                        .with(csrf()))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.message").value(expectedMessage))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser(username = "testUser")
    void updateScore_shouldReturnUpdatedUser() throws Exception {
        mongoUserRepository.save(testUser);

        mockMvc.perform(put("/api/user/score/" + testUser.id())
                        .param("bonus", "100")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id":"123" ,"username": "testUser", "co2Score": 100}
                        """));
    }

    @Test
    @WithMockUser(username = "testUser")
    void updateScore_shouldThrowStatusIsUnauthorized_whenIdNotUserIdOrUserNotLoggedIn() throws Exception {
        mongoUserRepository.save(testUser);
         String expectedMessage = "Not allowed!";

        mockMvc.perform(put("/api/user/score/" + "abc")
                        .param("bonus", "100")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value(expectedMessage))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser(username = "testUser")
    void resetScore_shouldResetScore() throws Exception {
        mongoUserRepository.save(testUser);

        mockMvc.perform(post("/api/user/score/reset/" + testUser.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                          {"id":"123" ,"username": "testUser", "co2Score": 0}
                        """));
    }

    @Test
    @WithMockUser(username = "testUser")
    void resetScore_shouldThrowStatusIsUnauthorized_whenIdIsNotEqualLoginId() throws Exception {
        mongoUserRepository.save(testUser);
        String expectedMessage = "Not allowed!";

        mockMvc.perform(post("/api/user/score/reset/" + "abc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value(expectedMessage))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());


    }
}
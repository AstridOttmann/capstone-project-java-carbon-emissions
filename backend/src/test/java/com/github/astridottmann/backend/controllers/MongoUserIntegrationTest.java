package com.github.astridottmann.backend.controllers;

import com.github.astridottmann.backend.models.MongoUser;
import com.github.astridottmann.backend.repositories.MongoUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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

    @Test
    @WithMockUser(username = "testUser")
    void getMe_shouldReturnUser() throws Exception {
        mockMvc.perform(get("/api/user/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("testUser"));

    }

    @Test
    @WithMockUser(username = "testUser")
    void login_shouldReturnUser() throws Exception {
        mockMvc.perform(post("/api/user/login")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("testUser"));

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
                        .content("""
                                { "username": "testUser", "password": "1234abc"}
                                 """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"username":  "testUser"}
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.password").isNotEmpty());
    }

    @Test
    @WithMockUser
    void signIn_shouldReturnApiErrorAndStatusIsUnprocessable_whenUsernameAlreadyExists() throws Exception {
        MongoUser testUser = new MongoUser("123", "testUser", "1234abc");
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
}
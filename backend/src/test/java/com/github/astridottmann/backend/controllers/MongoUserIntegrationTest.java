package com.github.astridottmann.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserIntegrationTest {

    @Autowired
    MockMvc mockMvc;

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
    @WithMockUser(username= "testUser")
    void logout_shouldLogoutUser() throws Exception {
        mockMvc.perform(post("/api/user/logout")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }
}
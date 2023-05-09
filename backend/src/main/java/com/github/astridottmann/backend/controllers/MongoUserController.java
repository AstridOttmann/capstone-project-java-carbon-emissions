package com.github.astridottmann.backend.controllers;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class MongoUserController {

    @GetMapping("/me")
    public String getMe() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }
}

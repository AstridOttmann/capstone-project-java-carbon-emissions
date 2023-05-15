package com.github.astridottmann.backend.controllers;

import com.github.astridottmann.backend.models.MongoUser;
import com.github.astridottmann.backend.repositories.MongoUserRepository;
import com.github.astridottmann.backend.services.MongoUserDetailsService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MongoUserController {

    private final MongoUserRepository mongoUserRepository;

    private final PasswordEncoder passwordEncoder;
    private final MongoUserDetailsService mongoUserDetailsService;

    @GetMapping("/me")
    public MongoUser getMe() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return mongoUserDetailsService.getUserInfo(username);
    }

    @PostMapping("/login")
    public MongoUser login() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return mongoUserDetailsService.getUserInfo(username);

    }

    @PostMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }

    @PostMapping("/signin")
    public MongoUser signIn(@RequestBody @Valid MongoUser user) {
        if (mongoUserRepository.findMongoUserByUsername(user.username()).isPresent()) {
            String errorMessage = "Username already exists!";
            throw new IllegalArgumentException(errorMessage);
        }
        String encodedPassword = passwordEncoder.encode(user.password());
        MongoUser newUser = new MongoUser(null, user.username(), encodedPassword);
        return mongoUserRepository.save(newUser);
    }

}
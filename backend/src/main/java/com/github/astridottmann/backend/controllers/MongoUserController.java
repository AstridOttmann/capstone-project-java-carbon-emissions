package com.github.astridottmann.backend.controllers;

import com.github.astridottmann.backend.models.MongoUser;
import com.github.astridottmann.backend.models.MongoUserDTO;
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
    public MongoUserDTO getMe() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return mongoUserDetailsService.getUserInfoByUsername(username);
    }

    @PostMapping("/login")
    public MongoUserDTO login() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return mongoUserDetailsService.getUserInfoByUsername(username);
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
        MongoUser newUser = new MongoUser(null, user.username(), encodedPassword, user.co2Score());
        return mongoUserRepository.save(newUser);
    }

    @PutMapping("/score/{id}")
    public MongoUserDTO updateScore(@PathVariable String id, @RequestParam("bonus") double bonus) {
        if (!id.equals(login().id())) {
            String errorMessage = "Not allowed!";
            throw new IllegalCallerException(errorMessage);
        }
        MongoUser updated = mongoUserDetailsService.updateScore(id, bonus);
        return new MongoUserDTO(id, updated.username(), updated.co2Score());

    }

    @PostMapping("/score/reset/{id}")
    public MongoUserDTO resetScore(@PathVariable String id) {
        if (!id.equals(login().id())) {
            String errorMessage = "Not allowed!";
            throw new IllegalCallerException(errorMessage);
        }
        MongoUser reseted = mongoUserDetailsService.resetScore(id);
        return new MongoUserDTO(id, reseted.username(), reseted.co2Score());

    }

}
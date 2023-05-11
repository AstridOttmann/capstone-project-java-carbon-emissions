package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.MongoUser;
import com.github.astridottmann.backend.repositories.MongoUserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class MongoUserDetailsServiceTest {
    final MongoUserRepository mongoUserRepository = mock(MongoUserRepository .class);
    final MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);

    @Test
    void loadUserByUsername_shouldReturnUser(){
        MongoUser testUser = new MongoUser("1", "testUser", "test");

        Mockito.when(mongoUserRepository.findMongoUserByUsername("testUser"))
                .thenReturn(Optional.of(testUser));

        UserDetails actual = mongoUserDetailsService.loadUserByUsername("testUser");
        UserDetails expected = new User(testUser.username(), testUser.password(), Collections.emptyList());

        verify(mongoUserRepository).findMongoUserByUsername("testUser");
        assertEquals(expected, actual);
    }

    @Test
    void loadUserByUsername_shouldThrowException_whenNoUser(){
       /* Mockito.when(mongoUserRepository.findMongoUserByUsername("user"))
                .thenReturn();*/

        Exception exception = assertThrows(UsernameNotFoundException.class,
                ()-> mongoUserDetailsService.loadUserByUsername("user"));

        verify(mongoUserRepository).findMongoUserByUsername("user");
        String actual = exception.getMessage();
        String expected = "User with name user not found!";
        assertEquals(expected, actual);
    }
}
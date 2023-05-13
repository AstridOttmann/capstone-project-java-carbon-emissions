package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.MongoUser;
import com.github.astridottmann.backend.repositories.MongoUserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class MongoUserDetailsServiceTest {
    final MongoUserRepository mongoUserRepository = mock(MongoUserRepository .class);
    final MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);

    @Test
    void getUserInfo_shouldReturnUser(){
        MongoUser testUser = new MongoUser("1", "testUser", "test");

        Mockito.when(mongoUserRepository.findMongoUserByUsername("testUser"))
                .thenReturn(Optional.of(testUser));

        MongoUser actual = mongoUserDetailsService.getUserInfo("testUser");
        MongoUser expected = new MongoUser(testUser.id(), testUser.username(), testUser.password());

        verify(mongoUserRepository).findMongoUserByUsername("testUser");
        assertEquals(expected, actual);
    }

    @Test
    void getUserInfo_shouldThrowException_whenNoUser(){
       /* Mockito.when(mongoUserRepository.findMongoUserByUsername("user"))
                .thenReturn();*/

        Exception exception = assertThrows(UsernameNotFoundException.class,
                ()-> mongoUserDetailsService.getUserInfo("user"));

        verify(mongoUserRepository).findMongoUserByUsername("user");
        String actual = exception.getMessage();
        String expected = "User with name user not found!";
        assertEquals(expected, actual);
    }
}
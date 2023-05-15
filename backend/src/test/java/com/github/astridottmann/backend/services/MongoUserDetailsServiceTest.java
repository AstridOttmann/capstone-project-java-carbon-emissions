package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.MongoUser;
import com.github.astridottmann.backend.models.MongoUserDTO;
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
        MongoUser testUser = new MongoUser("1", "testUser", "12345678", 0);

        Mockito.when(mongoUserRepository.findMongoUserByUsername("testUser"))
                .thenReturn(Optional.of(testUser));

        MongoUserDTO actual = mongoUserDetailsService.getUserInfoByUsername("testUser");
        MongoUserDTO expected = new MongoUserDTO(testUser.id(), testUser.username(), testUser.co2Score());

        verify(mongoUserRepository).findMongoUserByUsername("testUser");
        assertEquals(expected, actual);
    }

    @Test
    void getUserInfo_shouldThrowException_whenNoUser(){
       /* Mockito.when(mongoUserRepository.findMongoUserByUsername("user"))
                .thenReturn();*/

        Exception exception = assertThrows(UsernameNotFoundException.class,
                ()-> mongoUserDetailsService.getUserInfoByUsername("user"));

        verify(mongoUserRepository).findMongoUserByUsername("user");
        String actual = exception.getMessage();
        String expected = "User with name user not found!";
        assertEquals(expected, actual);
    }
}
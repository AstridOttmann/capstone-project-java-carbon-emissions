package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.MongoUser;
import com.github.astridottmann.backend.models.MongoUserDTO;
import com.github.astridottmann.backend.repositories.MongoUserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class MongoUserDetailsServiceTest {
    final MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    final MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);
    private final MongoUser testUser = new MongoUser("1", "testUser", "12345678", 0);

    @Test
    void getUserInfo_shouldReturnUser() {
        Mockito.when(mongoUserRepository.findMongoUserByUsername("testUser"))
                .thenReturn(Optional.of(testUser));

        MongoUserDTO actual = mongoUserDetailsService.getUserInfoByUsername("testUser");
        MongoUserDTO expected = new MongoUserDTO(testUser.id(), testUser.username(), testUser.co2Score());

        verify(mongoUserRepository).findMongoUserByUsername("testUser");
        assertEquals(expected, actual);
    }

    @Test
    void getUserInfo_shouldThrowException_whenNoUser() {
        Exception exception = assertThrows(UsernameNotFoundException.class,
                () -> mongoUserDetailsService.getUserInfoByUsername("user"));

        verify(mongoUserRepository).findMongoUserByUsername("user");
        String actual = exception.getMessage();
        String expected = "User with name user not found!";
        assertEquals(expected, actual);
    }

    @Test
    void updateScore_shouldReturnUpdatedUser() {
        int newScore = 100;
        MongoUserDTO userDTO = new MongoUserDTO("1", "testUser", newScore);
        MongoUser expectedUser = new MongoUser("1", "testUser", "12345678", 100);

        Mockito.when(mongoUserRepository.findById(userDTO.id()))
                .thenReturn(Optional.of(testUser));
        Mockito.when(mongoUserRepository.save(expectedUser))
                .thenReturn(expectedUser);

        MongoUser updatedUser = mongoUserDetailsService.updateScore(userDTO.id(), userDTO);

        verify(mongoUserRepository).findById(userDTO.id());
        verify(mongoUserRepository).save(expectedUser);
        assertEquals(expectedUser, updatedUser);
    }

    @Test
    void updateScore_shouldThrowException_whenUserNotFound() {
        int newScore = 100;
        MongoUserDTO userDTO = new MongoUserDTO("1", "testUser", newScore);

        Exception exception = assertThrows(NoSuchElementException.class,
                () -> mongoUserDetailsService.updateScore("1", userDTO));

        verify(mongoUserRepository).findById(userDTO.id());
        String expected = "User not found!";
        assertEquals(expected, exception.getMessage());
    }
}

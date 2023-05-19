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
        MongoUser expectedUser = new MongoUser("1", "testUser", "12345678", 100);

        Mockito.when(mongoUserRepository.findById(testUser.id()))
                .thenReturn(Optional.of(testUser));
        Mockito.when(mongoUserRepository.save(expectedUser))
                .thenReturn(expectedUser);

        MongoUser updatedUser = mongoUserDetailsService.updateScore(testUser.id(), 100);

        verify(mongoUserRepository).findById(testUser.id());
        verify(mongoUserRepository).save(expectedUser);
        assertEquals(expectedUser, updatedUser);
    }

    @Test
    void updateScore_shouldThrowException_whenUserNotFound() {
        Exception exception = assertThrows(NoSuchElementException.class,
                () -> mongoUserDetailsService.updateScore("1", 100));

        verify(mongoUserRepository).findById("1");
        String expected = "User not found!";
        assertEquals(expected, exception.getMessage());
    }

    @Test
    void resetScore_shouldResetScore(){
        MongoUser userToReset = new MongoUser("1", "testUser", "12345678", 100);

        Mockito.when(mongoUserRepository.findById(userToReset.id()))
                .thenReturn(Optional.of(userToReset));
        Mockito.when(mongoUserRepository.save(testUser))
                .thenReturn(testUser);

        MongoUser actual = mongoUserDetailsService.resetScore(userToReset.id());

        verify(mongoUserRepository).findById(userToReset.id());
        verify(mongoUserRepository).save(testUser);
        assertEquals(testUser, actual);
    }

    @Test
    void resetScore_shouldThrowException_whenUserNotFound() {
        Exception exception = assertThrows(NoSuchElementException.class,
                () -> mongoUserDetailsService.resetScore("1"));

        verify(mongoUserRepository).findById("1");
        String expected = "User not found!";
        assertEquals(expected, exception.getMessage());
    }
}

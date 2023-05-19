package com.github.astridottmann.backend.services;

import com.github.astridottmann.backend.models.MongoUser;
import com.github.astridottmann.backend.models.MongoUserDTO;
import com.github.astridottmann.backend.repositories.MongoUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.NoSuchElementException;

@Service
public class MongoUserDetailsService implements UserDetailsService {
    private final MongoUserRepository mongoUserRepository;

    public MongoUserDetailsService(MongoUserRepository mongoUserRepository) {
        this.mongoUserRepository = mongoUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser user =
                mongoUserRepository.findMongoUserByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User with name " + username + " not found!"));
        return new User(user.username(), user.password(), Collections.emptyList());
    }


    public MongoUserDTO getUserInfoByUsername(String username) {
        MongoUser user = mongoUserRepository.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with name " + username + " not found!"));
        return new MongoUserDTO(user.id(), user.username(), user.co2Score());
    }

    public boolean existsById(String userId) {
        return mongoUserRepository.existsById(userId);
    }

    public MongoUser updateScore(String id, double bonus) {
        MongoUser user =
                mongoUserRepository.findById(id)
                        .orElseThrow(() -> new NoSuchElementException("User not found!"));
        double newScore = user.co2Score() + bonus;
        return mongoUserRepository.save(user.withCo2Score(newScore));
    }

    public MongoUser resetScore(String id) {
        MongoUser userToReset = mongoUserRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found!"));
        MongoUser resetedUser = userToReset.withCo2Score(0);
        return mongoUserRepository.save(resetedUser);

    }
}

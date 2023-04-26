package com.github.astridottmann.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
@RequiredArgsConstructor
public class IdService {
    public String createRandomId() {
        return UUID.randomUUID().toString();
    }
}

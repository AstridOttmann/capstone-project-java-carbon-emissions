package com.github.astridottmann.backend.repositories;

import com.github.astridottmann.backend.models.Route;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends MongoRepository<Route, String> {
}

package com.github.astridottmann.backend.repositories;

import com.github.astridottmann.backend.models.CompareRoutes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompareRoutesRepository extends MongoRepository<CompareRoutes, String> {
}

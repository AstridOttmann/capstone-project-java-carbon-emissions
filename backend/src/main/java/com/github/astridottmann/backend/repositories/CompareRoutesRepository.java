package com.github.astridottmann.backend.repositories;

import com.github.astridottmann.backend.models.CompareRoutes;
import com.github.astridottmann.backend.models.Route;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompareRoutesRepository extends MongoRepository<CompareRoutes, String> {
List<CompareRoutes> findAllByComparedContains(Route route);
}


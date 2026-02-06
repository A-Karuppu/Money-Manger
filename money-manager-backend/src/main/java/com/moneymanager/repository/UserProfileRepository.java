package com.moneymanager.repository;

import com.moneymanager.model.UserProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserProfileRepository
        extends MongoRepository<UserProfile, String> {

    Optional<UserProfile> findByAuthUserId(String authUserId);
}

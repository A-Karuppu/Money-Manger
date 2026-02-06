package com.moneymanager.service;

import com.moneymanager.model.UserProfile;
import com.moneymanager.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private final UserProfileRepository repository;

    public UserProfileService(UserProfileRepository repository) {
        this.repository = repository;
    }

    public UserProfile getProfile(String authUserId) {
        return repository.findByAuthUserId(authUserId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    public UserProfile createProfile(UserProfile profile) {
        return repository.save(profile);
    }

    public UserProfile updateProfile(String authUserId, UserProfile updated) {
        UserProfile profile = getProfile(authUserId);

        profile.setFullName(updated.getFullName());
        profile.setPhone(updated.getPhone());
        profile.setAvatarUrl(updated.getAvatarUrl());
        profile.setPreferences(updated.getPreferences());

        return repository.save(profile);
    }
}

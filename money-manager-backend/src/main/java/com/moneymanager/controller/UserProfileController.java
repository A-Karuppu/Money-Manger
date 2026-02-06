package com.moneymanager.controller;

import com.moneymanager.model.UserProfile;
import com.moneymanager.service.UserProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/settings/profile")
public class UserProfileController {

    private final UserProfileService service;

    public UserProfileController(UserProfileService service) {
        this.service = service;
    }

    @GetMapping
    public UserProfile getProfile(@RequestParam String authUserId) {
        return service.getProfile(authUserId);
    }

    @PutMapping
    public UserProfile updateProfile(
            @RequestParam String authUserId,
            @RequestBody UserProfile profile) {

        return service.updateProfile(authUserId, profile);
    }
}

package com.moneymanager.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "user_profiles")
public class UserProfile {

    @Id
    private String id;

    private String authUserId;
    private String fullName;
    private String email;
    private String phone;
    private String avatarUrl;

    private Preferences preferences;

    // getters & setters
}

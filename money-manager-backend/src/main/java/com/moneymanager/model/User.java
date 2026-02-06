package com.moneymanager.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String fullName;

    private String email;

    private String phoneNumber;   // 🔔 REQUIRED FOR NOTIFICATION

    private String password;

    private String role = "USER";

    private boolean active = true;

    private LocalDateTime createdAt = LocalDateTime.now();
}

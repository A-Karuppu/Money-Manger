package com.moneymanager.dto;

import lombok.Data;

@Data
public class SignupRequest {

    private String fullName;
    private String email;
    private String phoneNumber;
    private String password;
}

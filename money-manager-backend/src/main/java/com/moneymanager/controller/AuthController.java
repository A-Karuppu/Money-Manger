package com.moneymanager.controller;

import com.moneymanager.dto.SignupRequest;
import com.moneymanager.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {

        userService.signup(request);
        return ResponseEntity.ok("Signup successful");
    }
}

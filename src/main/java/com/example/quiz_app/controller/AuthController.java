package com.example.quiz_app.controller;

import com.example.quiz_app.dto.AuthRequest;
import com.example.quiz_app.dto.AuthResponse;
import com.example.quiz_app.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500"
})
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody AuthRequest request) {

        if (userService.usernameExists(request.getUsername())) {
            return new AuthResponse(
                    false,
                    "Username already taken!",
                    null
            );
        }

        userService.registerUser(
                request.getUsername(),
                request.getPassword()
        );

        return new AuthResponse(
                true,
                "Account created successfully!",
                request.getUsername()
        );
    }

    @PostMapping("/signin")
    public AuthResponse signin(@RequestBody AuthRequest request) {

        boolean valid = userService.validateLogin(
                request.getUsername(),
                request.getPassword()
        );

        if (!valid) {
            return new AuthResponse(
                    false,
                    "Invalid username or password!",
                    null
            );
        }

        return new AuthResponse(
                true,
                "Login successful!",
                request.getUsername()
        );
    }
}

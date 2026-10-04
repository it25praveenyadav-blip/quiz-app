error id: file:///C:/Users/USER/Downloads/quiz-app/src/main/java/controller/AuthController.java:_empty_/UserService#usernameExists#
file:///C:/Users/USER/Downloads/quiz-app/src/main/java/controller/AuthController.java
empty definition using pc, found symbol in pc: _empty_/UserService#usernameExists#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 663
uri: file:///C:/Users/USER/Downloads/quiz-app/src/main/java/controller/AuthController.java
text:
```scala
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

        if (userService.usernameE@@xists(request.getUsername())) {
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
```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/UserService#usernameExists#
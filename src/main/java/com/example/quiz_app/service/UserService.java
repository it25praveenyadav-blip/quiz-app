package com.example.quiz_app.service;

import com.example.quiz_app.entity.User;
import com.example.quiz_app.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public void registerUser(String username, String password) {

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);

        userRepository.save(user);
    }

    public boolean validateLogin(String username, String password) {

        return userRepository.findByUsername(username)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);
    }
}
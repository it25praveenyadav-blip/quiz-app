package com.example.quiz_app.dto;

import jakarta.validation.constraints.NotBlank;

public record AdminLoginRequest(@NotBlank String password) {
}

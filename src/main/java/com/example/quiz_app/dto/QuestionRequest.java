package com.example.quiz_app.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record QuestionRequest(
        @NotBlank @Size(max = 500) String text,
        @NotNull @Size(min = 4, max = 4) List<@NotBlank @Size(max = 200) String> options,
        @Min(0) @Max(3) int correct) {
}

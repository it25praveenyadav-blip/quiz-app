package com.example.quiz_app.dto;

import java.util.List;

public record QuestionResponse(
        Long id,
        String category,
        String text,
        List<String> options,
        int correct) {
}

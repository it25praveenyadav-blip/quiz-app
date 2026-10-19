package com.example.quiz_app.dto;

import java.time.Instant;

public record LoginHistoryResponse(
        Long id,
        String username,
        Instant attemptedAt,
        boolean successful) {
}

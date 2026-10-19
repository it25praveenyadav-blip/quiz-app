package com.example.quiz_app.service;

import com.example.quiz_app.dto.LoginHistoryResponse;
import com.example.quiz_app.entity.LoginHistory;
import com.example.quiz_app.repository.LoginHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class LoginHistoryService {

    private static final int MAX_USERNAME_LENGTH = 255;

    private final LoginHistoryRepository loginHistoryRepository;

    public LoginHistoryService(LoginHistoryRepository loginHistoryRepository) {
        this.loginHistoryRepository = loginHistoryRepository;
    }

    @Transactional
    public void recordAttempt(String username, boolean successful) {
        String recordedUsername = username == null || username.isBlank()
                ? "(unknown)"
                : username;
        if (recordedUsername.length() > MAX_USERNAME_LENGTH) {
            recordedUsername = recordedUsername.substring(0, MAX_USERNAME_LENGTH);
        }
        loginHistoryRepository.save(new LoginHistory(recordedUsername, Instant.now(), successful));
    }

    @Transactional(readOnly = true)
    public List<LoginHistoryResponse> getRecentAttempts() {
        return loginHistoryRepository.findTop100ByOrderByAttemptedAtDesc().stream()
                .map(attempt -> new LoginHistoryResponse(
                        attempt.getId(),
                        attempt.getUsername(),
                        attempt.getAttemptedAt(),
                        attempt.isSuccessful()))
                .toList();
    }
}

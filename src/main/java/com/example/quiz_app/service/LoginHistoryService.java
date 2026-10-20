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
    private static final String USER_LOGIN = "USER";
    private static final String ADMIN_LOGIN = "ADMIN";

    private final LoginHistoryRepository loginHistoryRepository;

    public LoginHistoryService(LoginHistoryRepository loginHistoryRepository) {
        this.loginHistoryRepository = loginHistoryRepository;
    }

    @Transactional
    public void recordUserAttempt(String username, boolean successful) {
        recordAttempt(username, successful, USER_LOGIN);
    }

    public void recordAdminAttempt(boolean successful) {
        recordAttempt("admin", successful, ADMIN_LOGIN);
    }

    private void recordAttempt(String username, boolean successful, String loginType) {
        String recordedUsername = username == null || username.isBlank()
                ? "(unknown)"
                : username;
        if (recordedUsername.length() > MAX_USERNAME_LENGTH) {
            recordedUsername = recordedUsername.substring(0, MAX_USERNAME_LENGTH);
        }
        loginHistoryRepository.save(new LoginHistory(
                recordedUsername, Instant.now(), successful, loginType));
    }

    @Transactional(readOnly = true)
    public List<LoginHistoryResponse> getRecentUserAttempts() {
        List<LoginHistory> attempts = new java.util.ArrayList<>(
                loginHistoryRepository.findTop100ByLoginTypeOrderByAttemptedAtDesc(USER_LOGIN));
        attempts.addAll(loginHistoryRepository
                .findTop100ByLoginTypeIsNullAndUsernameNotIgnoreCaseOrderByAttemptedAtDesc("admin"));
        return attempts.stream()
                .sorted(java.util.Comparator.comparing(LoginHistory::getAttemptedAt).reversed())
                .limit(100)
                .map(attempt -> new LoginHistoryResponse(
                        attempt.getId(),
                        attempt.getUsername(),
                        attempt.getAttemptedAt(),
                        attempt.isSuccessful()))
                .toList();
    }
}

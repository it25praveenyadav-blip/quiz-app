package com.example.quiz_app;

import com.example.quiz_app.controller.AdminQuestionController;
import com.example.quiz_app.controller.AuthController;
import com.example.quiz_app.dto.AuthRequest;
import com.example.quiz_app.dto.AuthResponse;
import com.example.quiz_app.dto.LoginHistoryResponse;
import com.example.quiz_app.entity.User;
import com.example.quiz_app.repository.LoginHistoryRepository;
import com.example.quiz_app.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:login-history-test",
        "spring.datasource.username=sa",
        "spring.datasource.password="
})
class LoginHistoryIntegrationTests {

    private static final String TEST_USERNAME = "login-history-test-user";
    private static final String TEST_ADMIN_PASSWORD = UUID.randomUUID().toString();

    @DynamicPropertySource
    static void configureAdminPassword(DynamicPropertyRegistry registry) {
        registry.add("app.admin.password", () -> TEST_ADMIN_PASSWORD);
    }

    @Autowired
    private AuthController authController;

    @Autowired
    private AdminQuestionController adminQuestionController;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoginHistoryRepository loginHistoryRepository;

    @BeforeEach
    void setUp() {
        loginHistoryRepository.deleteAll();
        userRepository.deleteAll();
        userRepository.save(new User(TEST_USERNAME, "test-password"));
    }

    @Test
    void recordsSuccessfulAndFailedSigninAndProtectsHistoryEndpoint() {
        AuthResponse successfulSignin = authController.signin(request(TEST_USERNAME, "test-password"));
        AuthResponse failedSignin = authController.signin(request(TEST_USERNAME, "wrong-password"));

        assertTrue(successfulSignin.isSuccess());
        assertFalse(failedSignin.isSuccess());
        assertEquals(HttpStatus.UNAUTHORIZED, adminQuestionController.getLoginHistory(null).getStatusCode());

        ResponseEntity<List<LoginHistoryResponse>> response =
                adminQuestionController.getLoginHistory(TEST_ADMIN_PASSWORD);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertTrue(response.getBody().stream().allMatch(attempt ->
                attempt.username().equals(TEST_USERNAME) && attempt.attemptedAt() != null));
        assertEquals(1, response.getBody().stream().filter(LoginHistoryResponse::successful).count());
        assertEquals(1, response.getBody().stream().filter(attempt -> !attempt.successful()).count());
    }

    private AuthRequest request(String username, String password) {
        AuthRequest request = new AuthRequest();
        request.setUsername(username);
        request.setPassword(password);
        return request;
    }
}

package com.example.quiz_app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "login_history", indexes = {
        @Index(name = "idx_login_history_attempted_at", columnList = "attempted_at")
})
public class LoginHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String username;

    @Column(name = "attempted_at", nullable = false)
    private Instant attemptedAt;

    @Column(nullable = false)
    private boolean successful;

    @Column(name = "login_type", length = 20)
    private String loginType;

    protected LoginHistory() {
    }

    public LoginHistory(String username, Instant attemptedAt, boolean successful, String loginType) {
        this.username = username;
        this.attemptedAt = attemptedAt;
        this.successful = successful;
        this.loginType = loginType;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Instant getAttemptedAt() {
        return attemptedAt;
    }

    public boolean isSuccessful() {
        return successful;
    }

    public String getLoginType() {
        return loginType;
    }
}

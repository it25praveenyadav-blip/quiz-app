package com.example.quiz_app.repository;

import com.example.quiz_app.entity.LoginHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Long> {

    List<LoginHistory> findTop100ByOrderByAttemptedAtDesc();
}

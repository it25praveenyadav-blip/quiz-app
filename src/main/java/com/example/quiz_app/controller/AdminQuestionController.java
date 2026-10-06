package com.example.quiz_app.controller;

import com.example.quiz_app.dto.AdminLoginRequest;
import com.example.quiz_app.dto.QuestionRequest;
import com.example.quiz_app.dto.QuestionResponse;
import com.example.quiz_app.service.QuizQuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminQuestionController {

    private final QuizQuestionService questionService;
    private final byte[] adminPassword;

    public AdminQuestionController(
            QuizQuestionService questionService,
            @Value("${app.admin.password}") String adminPassword) {
        this.questionService = questionService;
        this.adminPassword = adminPassword.getBytes(StandardCharsets.UTF_8);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid @RequestBody AdminLoginRequest request) {
        return passwordMatches(request.password())
                ? ResponseEntity.noContent().build()
                : ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/questions/{category:sports|temples|songs|economics}")
    public ResponseEntity<List<QuestionResponse>> getQuestions(
            @PathVariable String category,
            @RequestHeader(value = "X-Admin-Password", required = false) String password) {
        if (!passwordMatches(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(questionService.findByCategory(category));
    }

    @PostMapping("/questions/{category:sports|temples|songs|economics}")
    public ResponseEntity<QuestionResponse> addQuestion(
            @PathVariable String category,
            @RequestHeader(value = "X-Admin-Password", required = false) String password,
            @Valid @RequestBody QuestionRequest request) {
        if (!passwordMatches(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(questionService.add(category, request));
    }

    @DeleteMapping("/questions/{category:sports|temples|songs|economics}/{id}")
    public ResponseEntity<Void> deleteQuestion(
            @PathVariable String category,
            @PathVariable Long id,
            @RequestHeader(value = "X-Admin-Password", required = false) String password) {
        if (!passwordMatches(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return questionService.delete(category, id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    private boolean passwordMatches(String candidate) {
        return candidate != null && MessageDigest.isEqual(
                adminPassword, candidate.getBytes(StandardCharsets.UTF_8));
    }
}

package com.example.quiz_app.controller;

import com.example.quiz_app.dto.QuestionResponse;
import com.example.quiz_app.service.QuizQuestionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuizQuestionController {

    private final QuizQuestionService questionService;

    public QuizQuestionController(QuizQuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/{category:sports|temples|songs|economics}")
    public List<QuestionResponse> getQuestions(@PathVariable String category) {
        return questionService.findByCategory(category);
    }
}

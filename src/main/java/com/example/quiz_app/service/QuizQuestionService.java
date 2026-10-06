package com.example.quiz_app.service;

import com.example.quiz_app.dto.QuestionRequest;
import com.example.quiz_app.dto.QuestionResponse;
import com.example.quiz_app.entity.QuizQuestion;
import com.example.quiz_app.repository.QuizQuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizQuestionService {

    private final QuizQuestionRepository questionRepository;

    public QuizQuestionService(QuizQuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Transactional(readOnly = true)
    public List<QuestionResponse> findByCategory(String category) {
        List<QuestionResponse> responses = new ArrayList<>();
        for (QuizQuestion question : questionRepository.findAllByCategoryOrderByIdAsc(category)) {
            responses.add(question.toResponse());
        }
        return responses;
    }

    public QuestionResponse add(String category, QuestionRequest request) {
        List<String> options = new ArrayList<>(4);
        for (String option : request.options()) {
            options.add(option.trim());
        }
        return questionRepository.save(new QuizQuestion(
                category, request.text().trim(), options, request.correct())).toResponse();
    }

    public boolean delete(String category, Long id) {
        return questionRepository.findByIdAndCategory(id, category)
                .map(question -> {
                    questionRepository.delete(question);
                    return true;
                })
                .orElse(false);
    }

}

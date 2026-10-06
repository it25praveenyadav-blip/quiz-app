package com.example.quiz_app.entity;

import com.example.quiz_app.dto.QuestionResponse;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "quiz_questions")
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String category;

    @Column(nullable = false, length = 500)
    private String text;

    @Column(nullable = false, length = 200)
    private String option0;

    @Column(nullable = false, length = 200)
    private String option1;

    @Column(nullable = false, length = 200)
    private String option2;

    @Column(nullable = false, length = 200)
    private String option3;

    @Column(nullable = false)
    private int correct;

    protected QuizQuestion() {
    }

    public QuizQuestion(String category, String text, List<String> options, int correct) {
        this.category = category;
        this.text = text;
        this.option0 = options.get(0);
        this.option1 = options.get(1);
        this.option2 = options.get(2);
        this.option3 = options.get(3);
        this.correct = correct;
    }

    public QuestionResponse toResponse() {
        return new QuestionResponse(id, category, text,
                List.of(option0, option1, option2, option3), correct);
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }
}

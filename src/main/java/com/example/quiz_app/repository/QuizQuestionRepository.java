package com.example.quiz_app.repository;

import com.example.quiz_app.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    List<QuizQuestion> findAllByCategoryOrderByIdAsc(String category);

    Optional<QuizQuestion> findFirstByCategoryAndText(String category, String text);

    Optional<QuizQuestion> findByIdAndCategory(Long id, String category);
}

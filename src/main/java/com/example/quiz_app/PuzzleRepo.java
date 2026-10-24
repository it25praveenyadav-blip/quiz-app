package com.example.quiz_app;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PuzzleRepo extends JpaRepository<Puzzle, Long> {
    List<Puzzle> findByTypeOrderByLevel(PuzzleType type);
    boolean existsByTitle(String title);
}

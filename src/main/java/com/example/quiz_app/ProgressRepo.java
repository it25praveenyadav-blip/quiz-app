package com.example.quiz_app;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProgressRepo extends JpaRepository<PuzzleProgress, Long> {
    boolean existsByUsernameAndPuzzleId(String username, Long puzzleId);
    List<PuzzleProgress> findByUsername(String username);
}

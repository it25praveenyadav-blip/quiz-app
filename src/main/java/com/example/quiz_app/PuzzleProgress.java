package com.example.quiz_app;

import jakarta.persistence.*;

@Entity
public class PuzzleProgress {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String username;
    public Long puzzleId;
    public PuzzleProgress() {}
    public PuzzleProgress(String u, Long p) { username = u; puzzleId = p; }
}

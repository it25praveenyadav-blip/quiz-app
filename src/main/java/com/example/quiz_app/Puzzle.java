package com.example.quiz_app;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Puzzle {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Enumerated(EnumType.STRING)
    public PuzzleType type;
    public int level;
    public String title;
    @Column(length = 1000)
    public String question;
    @JsonIgnore
    public String answer;
    public String hint;
    public int xp;
    public int coins;
}

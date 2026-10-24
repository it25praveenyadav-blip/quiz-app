package com.example.quiz_app;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class PlayerStats {
    @Id
    public String username;
    public int xp, coins, streak, solved;
    public LocalDate lastDaily;
    public PlayerStats() {}
    public PlayerStats(String username) { this.username = username; }
}

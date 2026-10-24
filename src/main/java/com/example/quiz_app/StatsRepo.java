package com.example.quiz_app;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StatsRepo extends JpaRepository<PlayerStats, String> {
    List<PlayerStats> findTop10ByOrderByXpDesc();
}

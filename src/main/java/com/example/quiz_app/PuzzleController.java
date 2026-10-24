package com.example.quiz_app;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@RestController
@RequestMapping("/api")
public class PuzzleController {
    private final PuzzleRepo puzzles;
    private final StatsRepo stats;
    private final ProgressRepo progress;

    public PuzzleController(PuzzleRepo puzzles, StatsRepo stats, ProgressRepo progress) {
        this.puzzles = puzzles; this.stats = stats; this.progress = progress;
    }

    public record SolveRequest(String username, String answer) {}
    public record MemoryResult(String username, int moves, int seconds) {}

    private static LocalDate today() { return LocalDate.now(ZoneId.of("Asia/Kolkata")); }

    @GetMapping("/puzzles")
    public List<Puzzle> list(@RequestParam PuzzleType type) {
        return puzzles.findByTypeOrderByLevel(type);
    }

    @GetMapping("/puzzles/daily")
    public Puzzle daily() {
        var all = puzzles.findByTypeOrderByLevel(PuzzleType.DAILY);
        return all.get(today().getDayOfYear() % all.size());
    }

    @GetMapping("/progress/{username}")
    public Map<String, Object> me(@PathVariable String username) {
        var s = stats.findById(username).orElse(new PlayerStats(username));
        var solved = progress.findByUsername(username).stream().map(p -> p.puzzleId).toList();
        return Map.of("xp", s.xp, "coins", s.coins, "streak", s.streak, "solved", solved);
    }

    @PostMapping("/puzzles/{id}/solve")
    @Transactional
    public Map<String, Object> solve(@PathVariable Long id, @RequestBody SolveRequest req) {
        Puzzle p = puzzles.findById(id).orElseThrow();
        String given = req.answer().trim();
        boolean correct = Arrays.stream(p.answer.split("\\|")).anyMatch(a -> a.trim().equalsIgnoreCase(given));
        if (!correct) return Map.of("correct", false);

        if (p.type == PuzzleType.ESCAPE && p.level > 1) {
            var prev = puzzles.findByTypeOrderByLevel(PuzzleType.ESCAPE).stream()
                    .filter(x -> x.level == p.level - 1).findFirst();
            if (prev.isPresent() && !progress.existsByUsernameAndPuzzleId(req.username(), prev.get().id))
                return Map.of("correct", false, "locked", true);
        }

        var s = stats.findById(req.username()).orElse(new PlayerStats(req.username()));
        var today = today();
        boolean already = p.type == PuzzleType.DAILY
                ? today.equals(s.lastDaily)
                : progress.existsByUsernameAndPuzzleId(req.username(), id);
        if (already) return Map.of("correct", true, "already", true);

        int xp = p.xp, coins = p.coins;
        if (p.type == PuzzleType.DAILY) {
            s.streak = today.minusDays(1).equals(s.lastDaily) ? s.streak + 1 : 1;
            s.lastDaily = today;
            xp += s.streak * 5;
        } else {
            progress.save(new PuzzleProgress(req.username(), id));
            s.solved++;
        }
        s.xp += xp; s.coins += coins;
        stats.save(s);
        return Map.of("correct", true, "xp", xp, "coins", coins, "streak", s.streak);
    }

    @PostMapping("/memory/complete")
    public Map<String, Object> memory(@RequestBody MemoryResult r) {
        var s = stats.findById(r.username()).orElse(new PlayerStats(r.username()));
        int xp = Math.max(10, 100 - r.moves() * 2 - r.seconds() / 2);
        s.xp += xp; s.coins += xp / 5; s.solved++;
        stats.save(s);
        return Map.of("xp", xp, "coins", xp / 5);
    }

    @GetMapping("/leaderboard")
    public List<PlayerStats> leaderboard() {
        return stats.findTop10ByOrderByXpDesc();
    }
}

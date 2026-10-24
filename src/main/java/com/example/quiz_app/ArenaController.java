package com.example.quiz_app;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

// Package apne project ke hisaab se badlo (PuzzleController wale package mein hi rakho)
@RestController
@RequestMapping("/api/arena")
public class ArenaController {

    record Q(String game, int level, String prompt, List<String> options, String answer, String why) {}
    record Issued(Q q, String user) {}
    public record AnswerReq(String username, String token, String answer, boolean battle) {}

    // Answers sirf server par rehte hain, frontend ko kabhi nahi bheje jaate
    private static final List<Q> BANK = List.of(
        new Q("code", 1, "2, 6, 12, 20, 30, ?", List.of("36", "40", "42", "44"), "42", "Terms are n(n+1): 1x2, 2x3, 3x4, 4x5, 5x6, so next is 6x7 = 42."),
        new Q("code", 1, "3, 6, 11, 18, 27, ?", List.of("36", "38", "40", "42"), "38", "Each term is a square plus 2: 1+2, 4+2, 9+2, 16+2, 25+2, so next is 36+2 = 38."),
        new Q("code", 2, "2, 3, 5, 9, 17, ?", List.of("31", "33", "34", "35"), "33", "Differences double: +1, +2, +4, +8, +16, so 17+16 = 33."),
        new Q("code", 2, "1, 2, 6, 24, 120, ?", List.of("600", "720", "840", "960"), "720", "Factorials: 1!, 2!, 3!, 4!, 5!, so next is 6! = 720."),
        new Q("code", 3, "4, 9, 25, 49, 121, ?", List.of("144", "169", "196", "225"), "169", "Squares of primes: 2, 3, 5, 7, 11, so next is 13 squared = 169."),
        new Q("code", 3, "1, 3, 7, 15, 31, ?", List.of("55", "61", "63", "65"), "63", "Each term is 2^n - 1, or double the previous plus 1: 31x2+1 = 63."),

        new Q("cipher", 1, "Decode (each letter shifted +1): UIF USBJO JT MBUF", List.of(), "THE TRAIN IS LATE", "Shift every letter back by 1: U->T, I->H, F->E."),
        new Q("cipher", 1, "Decode (Caesar shift 3): KHOOR ZRUOG", List.of(), "HELLO WORLD", "Shift every letter back by 3: K->H, H->E, O->L, R->O."),
        new Q("cipher", 2, "Decode (Caesar shift 5): RJJY FY STTS", List.of(), "MEET AT NOON", "Shift every letter back by 5: R->M, J->E, Y->T, S->N, T->O."),
        new Q("cipher", 2, "Decode (Atbash, A<->Z, B<->Y): GSV KZHHDLIW RH HVXIVG", List.of(), "THE PASSWORD IS SECRET", "Atbash mirrors the alphabet: G->T, S->H, V->E, K->P, Z->A."),
        new Q("cipher", 3, "Decode (unknown shift, try them all): RLLW PA ZPTWSL", List.of(), "KEEP IT SIMPLE", "The shift is 7. Move each letter back 7: R->K, L->E, W->P, Z->S."),
        new Q("cipher", 3, "Decode (unknown shift, try them all): WKH TXLFN EURZQ IRA", List.of(), "THE QUICK BROWN FOX", "The shift is 3. W->T, K->H, H->E, and so on."),

        new Q("detective", 1, "Murder at the library. Suspects: Aman, Bhavna, Chirag, Divya. Exactly ONE of them tells the truth, and the killer is one of the four. Aman: \"I did not do it.\" Bhavna: \"Chirag did it.\" Chirag: \"Bhavna is lying.\" Divya: \"Bhavna did it.\" Who is the killer?",
            List.of("Aman", "Bhavna", "Chirag", "Divya"), "Aman",
            "Bhavna and Chirag contradict each other, so exactly one of them is truthful. That means Aman and Divya both lie. Aman lying means he did it, and Divya's claim that Bhavna did it is false too. Only Chirag tells the truth."),
        new Q("detective", 2, "Diamond theft. Suspects: Rohan, Sneha, Tarun, Uma. Only the thief lies; everyone else tells the truth. Rohan: \"Tarun is the thief.\" Sneha: \"I am not the thief.\" Tarun: \"Uma is the thief.\" Uma: \"Tarun is lying.\" Who stole the diamond?",
            List.of("Rohan", "Sneha", "Tarun", "Uma"), "Tarun",
            "Rohan and Tarun name different thieves, so at least one lies, and only the thief lies. If Rohan were the thief, Tarun's accusation of Uma would be a second lie. So Tarun is the thief: his claim is false, while Rohan, Sneha and Uma are truthful."),

        new Q("seat", 1, "Five friends sit in a row, seats 1 to 5 from left to right: Asha, Bilal, Chetan, Divya, Esha. Asha sits in seat 1. Bilal sits next to Asha. Divya sits in seat 5. Chetan does not sit next to Bilal. Who sits in seat 3?",
            List.of("Asha", "Bilal", "Chetan", "Esha"), "Esha",
            "Asha is seat 1, Bilal seat 2, Divya seat 5. Seats 3 and 4 remain for Chetan and Esha. Seat 3 is next to Bilal, so Chetan must take seat 4 and Esha seat 3."),
        new Q("seat", 2, "Five friends sit in a row, seats 1 to 5 from left to right: Farhan, Gita, Hari, Isha, Jay. Hari sits at the right end. Farhan sits immediately left of Hari. Gita sits directly between Isha and Jay. Isha sits at the left end. Who sits between Gita and Farhan?",
            List.of("Hari", "Isha", "Jay", "Farhan"), "Jay",
            "Hari is seat 5 and Farhan seat 4. Isha is seat 1. Gita sits between Isha and Jay, so Gita is seat 2 and Jay seat 3. Jay sits between Gita (2) and Farhan (4)."),

        // Escape the Digital Room: lock1 = pattern, lock2 = hidden clue, lock3 = cipher
        new Q("lock1", 1, "Lock 1 panel shows: 5, 10, 15, 20, ?", List.of(), "25", "The pattern adds 5 each time."),
        new Q("lock1", 1, "Lock 1 panel shows: 3, 6, 12, 24, ?", List.of(), "48", "Each number doubles."),
        new Q("lock2", 1, "A note on the wall: \"Dogs Often Obey Rules\". Take the first letter of each word. What is the code word?", List.of(), "DOOR", "D-O-O-R spells DOOR."),
        new Q("lock2", 1, "A note on the wall: \"Great Ocean Lies Deep\". Take the first letter of each word. What is the code word?", List.of(), "GOLD", "G-O-L-D spells GOLD."),
        new Q("lock3", 1, "Final password is encrypted (each letter shifted +1): LFZ", List.of(), "KEY", "Shift each letter back by 1: L->K, F->E, Z->Y."),
        new Q("lock3", 1, "Final password is encrypted (each letter shifted +2): OQQP", List.of(), "MOON", "Shift each letter back by 2: O->M, Q->O, Q->O, P->N."),

        // Visual IQ
        new Q("visual", 1, "🔺 🔷 🔺 🔷 🔺 ?", List.of("🔺", "🔷", "🔶", "⬛"), "🔷", "The two shapes alternate, so after 🔺 comes 🔷."),
        new Q("visual", 1, "🔴 🟡 🟢 🔴 🟡 ?", List.of("🔴", "🟡", "🟢", "🔵"), "🟢", "Colours repeat in a cycle of three: red, yellow, green."),
        new Q("visual", 2, "⬆️ ➡️ ⬇️ ⬅️ ⬆️ ?", List.of("⬆️", "➡️", "⬇️", "⬅️"), "➡️", "The arrow rotates 90 degrees clockwise each step, so after ⬆️ comes ➡️."),
        new Q("visual", 2, "⭐ ⭐⭐ ⭐⭐⭐ ?", List.of("⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "🌟"), "⭐⭐⭐⭐", "One more star is added each step."),
        new Q("visual", 3, "🌑 🌒 🌓 🌔 ?", List.of("🌕", "🌖", "🌗", "🌘"), "🌕", "The moon waxes through its phases: new, crescent, quarter, gibbous, full."),
        new Q("visual", 3, "🔴 🔴🟡 🔴🟡🟡 ?", List.of("🔴🟡🟡🟡", "🔴🔴🟡🟡", "🟡🟡🟡🔴", "🔴🟡🟡"), "🔴🟡🟡🟡", "Each step keeps the previous group and adds one 🟡 at the end.")
    );

    private final Map<String, Issued> issued = new ConcurrentHashMap<>();
    private final Map<String, Long> battleStart = new ConcurrentHashMap<>();
    private final Map<String, Integer> combo = new ConcurrentHashMap<>();
    private final StatsRepo stats;

    public ArenaController(StatsRepo stats) { this.stats = stats; }

    private static String norm(String s) { return s == null ? "" : s.toUpperCase().replaceAll("[\\s\\p{Punct}]", ""); }

    // game = code | cipher | mix, level = 0 (any) / 1 / 2 / 3
    @GetMapping("/q")
    public Map<String, Object> next(@RequestParam String game, @RequestParam int level, @RequestParam String username) {
        if (game.equals("anomaly")) return anomaly(level, username);
        var pool = BANK.stream()
                .filter(q -> game.equals("mix") ? List.of("code", "cipher", "visual").contains(q.game()) : q.game().equals(game))
                .filter(q -> level == 0 || q.level() == level).toList();
        if (pool.isEmpty()) return Map.of("error", "No questions");
        Q q = pool.get(new Random().nextInt(pool.size()));
        String token = UUID.randomUUID().toString();
        issued.put(token, new Issued(q, username));
        return Map.of("token", token, "game", q.game(), "level", q.level(), "prompt", q.prompt(), "options", q.options());
    }

    // Hidden Anomaly: grid server par banta hai, odd cell ki position frontend ko nahi bheji jaati
    private Map<String, Object> anomaly(int level, String username) {
        int lv = Math.min(3, Math.max(1, level));
        String[][] pairs = {{"🍎", "🍅"}, {"🔺", "🔻"}, {"6", "9"}};
        Random rnd = new Random();
        boolean flip = rnd.nextBoolean();
        String base = flip ? pairs[lv - 1][1] : pairs[lv - 1][0];
        String odd = flip ? pairs[lv - 1][0] : pairs[lv - 1][1];
        int idx = rnd.nextInt(25);
        List<String> cells = new ArrayList<>();
        for (int i = 0; i < 25; i++) cells.add(i == idx ? odd : base);
        Q q = new Q("anomaly", lv, "Find the odd one out", cells, String.valueOf(idx),
                "The odd symbol " + odd + " was in cell " + (idx + 1) + " among the " + base + " symbols.");
        String token = UUID.randomUUID().toString();
        issued.put(token, new Issued(q, username));
        return Map.of("token", token, "game", "anomaly", "level", lv, "prompt", q.prompt(), "options", cells);
    }

    @PostMapping("/battle/start")
    public Map<String, Object> start(@RequestParam String username) {
        battleStart.put(username, System.currentTimeMillis());
        combo.put(username, 0);
        return Map.of("started", true);
    }

    @PostMapping("/a")
    public Map<String, Object> answer(@RequestBody AnswerReq r) {
        Issued i = issued.get(r.token());                       // single-use: dobara submit se points nahi milenge
        if (i == null || !i.user().equals(r.username())) return Map.of("error", "Invalid or already used question");

        if (r.battle()) {                                          // 60s + 2s network grace, uske baad answers reject
            Long s = battleStart.get(r.username());
            if (s == null || System.currentTimeMillis() - s > 62_000) return Map.of("expired", true);
        }

        boolean ok = norm(i.q().answer()).equals(norm(r.answer()));
        // Escape locks wrong answer par retry allow karte hain; baaki sab games mein token ek hi baar chalta hai
        if (ok || !i.q().game().startsWith("lock")) {
            if (issued.remove(r.token()) == null) return Map.of("error", "Question already answered");
        }
        int pts = 0;
        if (ok) {
            pts = i.q().level() * 10;                              // 10 / 20 / 30
            if (r.battle() && combo.merge(r.username(), 1, Integer::sum) % 3 == 0) pts += 15;  // 3 in a row bonus
        } else if (r.battle()) combo.put(r.username(), 0);

        if (pts > 0) {
            var st = stats.findById(r.username()).orElse(new PlayerStats(r.username()));
            st.xp += pts; st.solved++;
            stats.save(st);                                        // wahi XP jo leaderboard dikhata hai
        }
        return Map.of("correct", ok, "points", pts, "explanation", i.q().why());
    }
}

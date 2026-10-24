package com.example.quiz_app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class PuzzleSeeder implements CommandLineRunner {
    private final PuzzleRepo repo;
    public PuzzleSeeder(PuzzleRepo repo) { this.repo = repo; }

    @Override
    public void run(String... args) {
        // BRAIN 1-20
        add(PuzzleType.BRAIN, 1, "Doubling", "2, 4, 8, 16, ?", "32", "Har baar double");
        add(PuzzleType.BRAIN, 2, "Count by 3", "3, 6, 9, 12, ?", "15", "3 ka table");
        add(PuzzleType.BRAIN, 3, "Squares", "1, 4, 9, 16, ?", "25", "1x1, 2x2, 3x3...");
        add(PuzzleType.BRAIN, 4, "Keep Doubling", "5, 10, 20, 40, ?", "80", "Har number ka double");
        add(PuzzleType.BRAIN, 5, "Triangle Numbers", "1, 3, 6, 10, ?", "15", "Gap 2, 3, 4...");
        add(PuzzleType.BRAIN, 6, "Countdown", "100, 90, 80, 70, ?", "60", "Har baar 10 kam");
        add(PuzzleType.BRAIN, 7, "Prime Parade", "2, 3, 5, 7, 11, ?", "13", "Prime numbers");
        add(PuzzleType.BRAIN, 8, "Growing Gaps", "1, 2, 4, 7, 11, ?", "16", "Gap 1, 2, 3, 4...");
        add(PuzzleType.BRAIN, 9, "Multiply Neighbours", "2, 6, 12, 20, 30, ?", "42", "1x2, 2x3, 3x4...");
        add(PuzzleType.BRAIN, 10, "Cubes", "1, 8, 27, 64, ?", "125", "1x1x1, 2x2x2...");
        add(PuzzleType.BRAIN, 11, "Odd One", "I am an odd number. Take away one letter and I become even. Which number am I?", "seven|7", "Spelling dekho");
        add(PuzzleType.BRAIN, 12, "Lost Sheep", "A farmer has 17 sheep. All but 9 run away. How many are left?", "9", "'All but 9' ka matlab?");
        add(PuzzleType.BRAIN, 13, "February Trick", "How many months have 28 days?", "12", "Har mahine mein kam se kam 28 din");
        add(PuzzleType.BRAIN, 14, "Half Of", "What is half of 2 + 2?", "3", "Pehle half karo, phir add");
        add(PuzzleType.BRAIN, 15, "Apple Math", "You have 3 apples and you take away 2. How many apples do YOU have?", "2", "Tumne kitne liye?");
        add(PuzzleType.BRAIN, 16, "Shehar Bina Ghar", "Mere paas shehar hain par ghar nahi, jungle hain par ped nahi, paani hai par machhli nahi. Main kya hoon?", "map|a map|naksha", "Kaagaz par milta hai");
        add(PuzzleType.BRAIN, 17, "Leave Behind", "The more you take, the more you leave behind. What am I?", "footsteps|steps|footstep", "Chalte waqt");
        add(PuzzleType.BRAIN, 18, "Keys, No Locks", "I have keys but I can't open any lock. What am I?", "keyboard|piano", "Typing ya music");
        add(PuzzleType.BRAIN, 19, "No Mouth", "I speak without a mouth and hear without ears. What am I?", "echo", "Pahaad mein goonjti hai");
        add(PuzzleType.BRAIN, 20, "Wetter Dries", "What gets wetter the more it dries?", "towel", "Nahane ke baad");
        // BRAIN 21-30 (Sports, Temples, Songs, Economics)
        add(PuzzleType.BRAIN, 21, "Cricket Run Rate", "India ne 20 overs mein 180 runs banaye. Run rate (runs per over) kitna hai?", "9", "Runs / overs");
        add(PuzzleType.BRAIN, 22, "Sports Cipher", "Har letter ko 1 aage shift kiya gaya hai. Decode karo: DSJDLFU", "cricket", "Har letter ko 1 peeche karo");
        add(PuzzleType.BRAIN, 23, "Court Scramble", "Letters sahi karo: NTSEIN", "tennis", "Wimbledon ka khel");
        add(PuzzleType.BRAIN, 24, "Temple Steps", "Mandir mein 108 seedhiyan hain. Ravi 1 minute mein 12 seedhiyan chadhta hai. Upar pahunchne mein kitne minute lagenge?", "9", "108 / 12");
        add(PuzzleType.BRAIN, 25, "Temple Bell", "Main mandir ke darwaze par latakta hoon, hilane par awaaz karta hoon, par mera munh nahi hai. Main kya hoon?", "bell|ghanta|ghant|temple bell", "Pooja se pehle bajta hai");
        add(PuzzleType.BRAIN, 26, "Saat Swar", "Sa, Re, Ga, Ma, Pa, Dha, ? Agla swar kaun sa hai?", "ni", "Sargam ka aakhri swar");
        add(PuzzleType.BRAIN, 27, "Hidden Instrument", "Letters sahi karo: TIGUAR", "guitar", "6 taar wala instrument");
        add(PuzzleType.BRAIN, 28, "Discount Deal", "500 rupaye ki shopping par 20% discount mila. Kitne rupaye dene padenge?", "400", "20% of 500 = 100");
        add(PuzzleType.BRAIN, 29, "Simple Interest", "1000 rupaye par saal ka 10% byaaj. 2 saal mein kitna byaaj milega?", "200", "1000 x 10% x 2");
        add(PuzzleType.BRAIN, 30, "Monthly Saving", "Har mahine 500 rupaye bachao to 1 saal mein kitne rupaye bachenge?", "6000", "500 x 12");
        // ESCAPE 1-10
        add(PuzzleType.ESCAPE, 1, "Room 1: Locked Door", "Lock code: the smallest prime number + 7", "9", "2 + 7");
        add(PuzzleType.ESCAPE, 2, "Room 2: The Vault", "Vault code: 3 x 3 x 3", "27", "3 ka cube");
        add(PuzzleType.ESCAPE, 3, "Room 3: Clock Tower", "A clock shows 3:00. What is the angle between the hands?", "90", "Ek quarter circle");
        add(PuzzleType.ESCAPE, 4, "Room 4: Hexagon Hall", "Code: number of sides of a hexagon x 2", "12", "Hexagon = 6 sides");
        add(PuzzleType.ESCAPE, 5, "Room 5: Scrambled Sign", "Unscramble to open: ELZZUP", "puzzle", "Tum yahi khel rahe ho");
        add(PuzzleType.ESCAPE, 6, "Room 6: Even Steps", "Code: the 10th even number (2, 4, 6, ...)", "20", "10 x 2");
        add(PuzzleType.ESCAPE, 7, "Room 7: Silent Hands", "I have hands but I cannot clap. What am I?", "clock|watch", "Time batata hai");
        add(PuzzleType.ESCAPE, 8, "Room 8: Number Gate", "Gate code: 7 x 8", "56", "7 ka table");
        add(PuzzleType.ESCAPE, 9, "Room 9: Time Vault", "How many minutes are there in 2 hours?", "120", "2 x 60");
        add(PuzzleType.ESCAPE, 10, "Room 10: Final Lock", "Final code: (12 x 12) - 44", "100", "144 - 44");
        // DAILY 1-10
        add(PuzzleType.DAILY, 1, "Daily: Machines", "If 5 machines make 5 items in 5 minutes, how many minutes do 100 machines need to make 100 items?", "5", "Ek machine ka rate dekho");
        add(PuzzleType.DAILY, 2, "Daily: Fibonacci", "1, 1, 2, 3, 5, 8, ?", "13", "Pichle do ka sum");
        add(PuzzleType.DAILY, 3, "Daily: Months", "What comes next: J, F, M, A, M, J, ?", "J|July", "Mahino ke pehle akshar");
        add(PuzzleType.DAILY, 4, "Daily: Bat and Ball", "A bat and a ball cost Rs 110 together. The bat costs Rs 100 more than the ball. How many rupees is the ball?", "5", "Jawab 10 nahi hai");
        add(PuzzleType.DAILY, 5, "Daily: Next Prime", "What is the next prime number after 13?", "17", "15 prime nahi hai");
        add(PuzzleType.DAILY, 6, "Daily: Candle", "I am tall when I am young and short when I am old. What am I?", "candle", "Jalti hai to chhoti hoti hai");
        add(PuzzleType.DAILY, 7, "Daily: Subtract Five", "How many times can you subtract 5 from 25?", "1|once|one", "Subtract karne ke baad 25 rehta hai kya?");
        add(PuzzleType.DAILY, 8, "Daily: Percent", "What is 15% of 200?", "30", "10% + 5%");
        add(PuzzleType.DAILY, 9, "Daily: Missing Number", "2, 5, 11, 23, ?", "47", "x2 phir +1");
        add(PuzzleType.DAILY, 10, "Daily: Bottle", "What has a neck but no head?", "bottle", "Cold drink ki");
    }

    private void add(PuzzleType t, int level, String title, String q, String a, String hint) {
        if (repo.existsByTitle(title)) return;
        Puzzle p = new Puzzle();
        p.type = t; p.level = level; p.title = title; p.question = q; p.answer = a; p.hint = hint;
        p.xp = switch (t) { case BRAIN -> 10 + level; case ESCAPE -> 20 + level * 2; case DAILY -> 30; };
        p.coins = switch (t) { case BRAIN -> 5 + level / 4; case ESCAPE -> 10 + level; case DAILY -> 10; };
        repo.save(p);
    }
}

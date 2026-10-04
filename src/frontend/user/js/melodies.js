const NOTES = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00,
  A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25,
  F5: 698.46, G5: 783.99, A5: 880.00
};

const melodies = [
  { name: "Twinkle Twinkle Little Star", notes: ["C4","C4","G4","G4","A4","A4","G4","F4","F4","E4","E4","D4","D4","C4"], duration: 0.4 },
  { name: "Jingle Bells", notes: ["E4","E4","E4","E4","E4","E4","E4","G4","C4","D4","E4"], duration: 0.3 },
  { name: "Mary Had a Little Lamb", notes: ["E4","D4","C4","D4","E4","E4","E4","D4","D4","D4","E4","G4","G4"], duration: 0.35 },
  { name: "Row Row Row Your Boat", notes: ["C4","C4","C4","D4","E4","E4","D4","E4","F4","G4"], duration: 0.4 },
  { name: "Happy Birthday", notes: ["C4","C4","D4","C4","F4","E4","C4","C4","D4","C4","G4","F4"], duration: 0.4 },
  { name: "London Bridge Is Falling Down", notes: ["G4","A4","G4","F4","E4","F4","G4","D4","E4","F4"], duration: 0.35 },
  { name: "Old MacDonald Had a Farm", notes: ["C4","C4","C4","G4","A4","A4","G4","E4","E4","D4","D4","C4"], duration: 0.35 },
  { name: "Frere Jacques", notes: ["C4","D4","E4","C4","C4","D4","E4","C4","E4","F4","G4","E4","F4","G4"], duration: 0.3 }
];

function playMelody(noteNames, noteDuration = 0.4) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  let time = ctx.currentTime;

  noteNames.forEach(note => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = NOTES[note];
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.25, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + noteDuration - 0.03);
    osc.start(time);
    osc.stop(time + noteDuration);
    time += noteDuration;
  });

  return time - ctx.currentTime;
}

function generateSongQuestion(index) {
  const correct = melodies[index % melodies.length];
  const allNames = melodies.map(m => m.name);
  let wrongOptions = allNames.filter(n => n !== correct.name);
  wrongOptions = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
  let options = [...wrongOptions, correct.name].sort(() => 0.5 - Math.random());
  return {
    isAudio: true,
    text: "🎵 Listen and guess the song!",
    notes: correct.notes,
    noteDuration: correct.duration,
    options: options,
    correct: options.indexOf(correct.name)
  };
}

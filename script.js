const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐", "🔔"];
const spinButton = document.getElementById("spinButton");
const message = document.getElementById("message");
const creditsDisplay = document.getElementById("credits");
const backgroundMusic = document.getElementById("backgroundMusic");
const spinSound = document.getElementById("spinSound");
const jackpotSound = document.getElementById("jackpotSound");
const toggleMusicButton = document.getElementById("toggleMusic");

let credits = 100;

// Update credits
function updateCredits(amount) {
  credits += amount;
  creditsDisplay.textContent = credits;
}

// Reel spin animation
function spinReel(reel, callback) {
  reel.style.animation = "spin 1s ease-in-out";
  setTimeout(() => {
    reel.style.animation = "";
    callback();
  }, 1000);
}

// Handle spin
spinButton.addEventListener("click", () => {
  if (credits < 10) {
    message.textContent = "Kredit tidak cukup untuk taruhan!";
    return;
  }

  // Deduct credits
  updateCredits(-10);

  // Play spin sound
  spinSound.play();

  const reel1 = document.getElementById("reel1");
  const reel2 = document.getElementById("reel2");
  const reel3 = document.getElementById("reel3");

  const results = [];
  spinReel(reel1, () => (reel1.textContent = symbols[Math.floor(Math.random() * symbols.length)]));
  spinReel(reel2, () => (reel2.textContent = symbols[Math.floor(Math.random() * symbols.length)]));
  spinReel(reel3, () => {
    reel3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    results.push(reel1.textContent, reel2.textContent, reel3.textContent);

    // Check for jackpot
    if (results[0] === results[1] && results[1] === results[2]) {
      message.textContent = "🎉 Jackpot! Anda menang 50 kredit! 🎉";
      jackpotSound.play();
      updateCredits(50);
    } else {
      message.textContent = "Coba lagi!";
    }
  });
});

// Toggle music
toggleMusicButton.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    toggleMusicButton.textContent = "Matikan Musik";
  } else {
    backgroundMusic.pause();
    toggleMusicButton.textContent = "Hidupkan Musik";
  }
});
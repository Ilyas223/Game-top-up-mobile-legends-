// Simbol gulungan
const symbols = ["🍒", "🍋", "🍇", "🔔", "⭐", "💎"];

// Saldo awal pemain
let balance = 100;

// Fungsi untuk memutar gulungan
function spinReels() {
  return [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];
}

// Fungsi untuk menentukan kemenangan
function checkWin(reels) {
  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    return { type: "JACKPOT", multiplier: 10 };
  } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
    return { type: "SMALL_WIN", multiplier: 2 };
  }
  return { type: "NO_WIN", multiplier: 0 };
}

// Event listener untuk tombol spin
document.getElementById("spin").addEventListener("click", () => {
  const betInput = document.getElementById("bet");
  const bet = parseInt(betInput.value);
  const resultElement = document.getElementById("result");
  const balanceElement = document.getElementById("balance");

  if (isNaN(bet) || bet <= 0) {
    resultElement.textContent = "Masukkan taruhan yang valid!";
    return;
  }

  if (bet > balance) {
    resultElement.textContent = "Saldo Anda tidak cukup!";
    return;
  }

  // Kurangi saldo
  balance -= bet;

  // Putar gulungan
  const reels = spinReels();
  document.getElementById("reel1").textContent = reels[0];
  document.getElementById("reel2").textContent = reels[1];
  document.getElementById("reel3").textContent = reels[2];

  // Cek hasil
  const win = checkWin(reels);
  if (win.type !== "NO_WIN") {
    const winnings = bet * win.multiplier;
    balance += winnings;
    resultElement.textContent = `Anda menang: Rp ${winnings} (${win.type})!`;
  } else {
    resultElement.textContent = "Tidak ada kemenangan. Coba lagi!";
  }

  // Perbarui saldo
  balanceElement.textContent = balance;

  // Cek jika saldo habis
  if (balance <= 0) {
    resultElement.textContent = "Saldo Anda habis. Game over!";
    document.getElementById("spin").disabled = true;
  }
});

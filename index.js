let playerScore = 0;
let computerScore = 0;

const emojis = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️",
};

function getComputerMove() {
    const moves = ["rock", "paper", "scissors"];
    return moves[Math.floor(Math.random() * 3)];
}

function getResult(playerMove, computerMove) {
    if (playerMove === computerMove) return "tie";
    if (
        (playerMove === "rock" && computerMove === "scissors") ||
        (playerMove === "paper" && computerMove === "rock") ||
        (playerMove === "scissors" && computerMove === "paper")
    ) {
        return "win";
    }
    return "lose";
}

function playGame(playerMove) {
    const computerMove = getComputerMove();
    const result = getResult(playerMove, computerMove);

    setEmojiWithAnimation("player-emoji", emojis[playerMove]);
    setEmojiWithAnimation("computer-emoji", emojis[computerMove]);

    const clashIcon = document.getElementById("clash-icon");
    clashIcon.classList.remove("clash");
    void clashIcon.offsetWidth;
    clashIcon.classList.add("clash");

    document.querySelectorAll(".choice-btn").forEach(btn => btn.classList.remove("selected"));
    document.getElementById("btn-" + playerMove).classList.add("selected");

    const playerDisplay = document.getElementById("player-display");
    const computerDisplay = document.getElementById("computer-display");
    playerDisplay.classList.remove("win-glow", "lose-glow", "tie-glow");
    computerDisplay.classList.remove("win-glow", "lose-glow", "tie-glow");

    if (result === "win") {
        playerScore++;
        playerDisplay.classList.add("win-glow");
        computerDisplay.classList.add("lose-glow");
        setResult("🎉 You Win! " + emojis[playerMove] + " beats " + emojis[computerMove], "win");
        bumpScore("player-score");
    } else if (result === "lose") {
        computerScore++;
        computerDisplay.classList.add("win-glow");
        playerDisplay.classList.add("lose-glow");
        setResult("💀 You Lose! " + emojis[computerMove] + " beats " + emojis[playerMove], "lose");
        bumpScore("computer-score");
    } else {
        playerDisplay.classList.add("tie-glow");
        computerDisplay.classList.add("tie-glow");
        setResult("🤝 It's a Tie! Both chose " + emojis[playerMove], "tie");
    }

    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
}

function setEmojiWithAnimation(id, emoji) {
    const el = document.getElementById(id);
    el.classList.remove("reveal");
    void el.offsetWidth;
    el.textContent = emoji;
    el.classList.add("reveal");
}

function setResult(message, type) {
    const banner = document.getElementById("result-banner");
    banner.classList.remove("win", "lose", "tie", "pop");
    void banner.offsetWidth;
    banner.classList.add(type, "pop");
    document.getElementById("result-text").textContent = message;
}

function bumpScore(id) {
    const el = document.getElementById(id);
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;

    document.getElementById("player-score").textContent = "0";
    document.getElementById("computer-score").textContent = "0";
    document.getElementById("player-emoji").textContent = "❓";
    document.getElementById("computer-emoji").textContent = "❓";

    const banner = document.getElementById("result-banner");
    banner.className = "result-banner";
    document.getElementById("result-text").textContent = "Pick a move to start!";

    document.getElementById("player-display").className = "fighter";
    document.getElementById("computer-display").className = "fighter";

    document.querySelectorAll(".choice-btn").forEach(btn => btn.classList.remove("selected"));
    document.querySelectorAll(".score-card").forEach(card => card.classList.remove("winner"));
}
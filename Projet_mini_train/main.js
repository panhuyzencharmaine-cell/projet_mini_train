console.log("MAIN LOADED");
import { Game } from "./classe/game.js?v=3";

const canvas = document.getElementById("gameCanvas");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const endScreen = document.getElementById("endScreen");

let game = null;

startBtn.addEventListener("click", () => {

    const difficulty = parseInt(document.getElementById("difficulty").value);
    const trainCount = parseInt(document.getElementById("trainCount").value);

    menu.classList.add("hidden");
    gameContainer.classList.remove("hidden");

    game = new Game(canvas, difficulty, trainCount, endGame);
});

restartBtn.addEventListener("click", () => {
    location.reload();
});

function endGame(score) {
    gameContainer.classList.add("hidden");
    endScreen.classList.remove("hidden");
    document.getElementById("finalScore").innerText =
        "Score final : " + score;
}
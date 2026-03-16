import { Train } from "./train.js?v=3";
import { GameMap } from "./map.js?v=3";

export class Game {

    constructor(canvas, difficulty, trainCount, endCallback) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.difficulty = difficulty;
        this.totalTrains = trainCount;
        this.endCallback = endCallback;

        this.score = 0;
        this.startTime = Date.now();
        this.elapsedTime = 0;
        this.trains = [];
        this.spawned = 0;

        // Génération procédurale dépend difficulté
        this.map = new GameMap(canvas.height, difficulty);

        // === Difficulté ===
       if (difficulty === 1) {
    this.trainSpeed = 1.2;   // Facile
} else if (difficulty === 2) {
    this.trainSpeed = 1.6;   // Moyen
} else {
    this.trainSpeed = 2;     // Difficile
}
        this.spawnInterval = 2500 / difficulty;

        this.addClickListener();
        this.startSpawning();
        this.loop();
    }

    startSpawning() {

        this.spawnTimer = setInterval(() => {

            if (this.spawned >= this.totalTrains) {
                clearInterval(this.spawnTimer);
                return;
            }

            // Couleurs générées dynamiquement
            const color =
                this.map.activeColors[
                    Math.floor(Math.random() * this.map.activeColors.length)
                ];

            this.trains.push(
                new Train(color, 60, this.map.baseY, this.trainSpeed)
            );

            this.spawned++;

            const remaining = this.totalTrains - this.spawned;
            document.getElementById("remaining").innerText =
                "Trains restants : " + remaining;

        }, this.spawnInterval);
    }

    addClickListener() {

        this.canvas.addEventListener("click", (e) => {

            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.map.junctions.forEach(j => {
                if (j.isClicked(x, y)) {
                    j.toggle();
                }
            });

        });
    }

    update() {
        this.updateTimer();

        // Rotation des jonctions si animation activée
        this.map.junctions.forEach(j => {
            if (j.update) j.update();
        });

        this.trains.forEach(train => {

            train.update(this.map.junctions);

            this.map.stations.forEach(st => {

                if (st.checkArrival(train) && train.active) {

                    if (train.color === st.color) {
                        this.score++;
                        document.getElementById("score").innerText =
                            "Score : " + this.score;
                    }

                    train.active = false;
                }

            });

            // Sécurité : si train sort de l'écran
            if (train.x > this.canvas.width + 50) {
                train.active = false;
            }
        });

        // Fin de partie
        if (
            this.spawned >= this.totalTrains &&
            this.trains.every(t => !t.active)
        ) {
            this.endCallback(this.score);
        }
    }

    drawRails() {

    const ctx = this.ctx;
    const y = this.map.baseY;
    const gap = 6;

    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(50, y - gap);
    ctx.lineTo(this.canvas.width - 50, y - gap);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, y + gap);
    ctx.lineTo(this.canvas.width - 50, y + gap);
    ctx.stroke();
}

    drawTunnel() {

        const ctx = this.ctx;
        const y = this.map.baseY;

        ctx.fillStyle = "#111";
        ctx.fillRect(20, y - 30, 40, 60);
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#222";
this.ctx.font = "20px Arial";
this.ctx.fillText(
    "Temps : " + this.formatTime(this.elapsedTime),
    20,
    30
);
        this.drawTunnel();
        this.drawRails();

        this.map.junctions.forEach(j => j.draw(this.ctx));
        this.map.stations.forEach(s => s.draw(this.ctx));
        this.trains.forEach(t => t.draw(this.ctx));
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
    updateTimer() {
    this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
}

formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formattedMins = mins < 10 ? "0" + mins : mins;
    const formattedSecs = secs < 10 ? "0" + secs : secs;

    return formattedMins + ":" + formattedSecs;
}

}
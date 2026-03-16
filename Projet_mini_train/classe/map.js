import { Junction } from "./junction.js?v=3";
import { Station } from "./station.js?v=3";

export class GameMap {

    constructor(canvasHeight, difficulty) {

        this.baseY = canvasHeight / 2;

        this.junctions = [];
        this.stations = [];

        this.colors = [
            "red",
            "blue",
            "green",
            "purple",
            "orange",
            "yellow"
        ];

        this.generate(difficulty);
    }

    generate(difficulty) {

        // Nombre de jonctions dépend difficulté
        const junctionCount = 2 + difficulty;

        // Mélange les couleurs
        const shuffledColors = [...this.colors]
            .sort(() => Math.random() - 0.5)
            .slice(0, junctionCount);

        this.activeColors = shuffledColors;

        const startX = 150;
        const spacing = 140;

        for (let i = 0; i < junctionCount; i++) {

            // Petit décalage aléatoire
            const randomOffset = Math.random() * 60;

            const x = startX + i * spacing + randomOffset;

            const branchDirection =
                Math.random() > 0.5 ? "up" : "down";

            this.junctions.push(
                new Junction(x, this.baseY, branchDirection)
            );

            const stationY =
                branchDirection === "up"
                    ? this.baseY - 170
                    : this.baseY + 130;

            this.stations.push(
                new Station(
                    x - 30,
                    stationY,
                    shuffledColors[i]
                )
            );
        }
    }
}
export class Station {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 50;
        this.height = 40;
    }

    draw(ctx) {

        // Ombre
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(this.x + 4, this.y + 4, this.width, this.height);

        // Bâtiment
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.strokeStyle = "#222";
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Toit
        ctx.beginPath();
        ctx.moveTo(this.x - 5, this.y);
        ctx.lineTo(this.x + this.width / 2, this.y - 25);
        ctx.lineTo(this.x + this.width + 5, this.y);
        ctx.closePath();

        ctx.fillStyle = "#444";
        ctx.fill();
        ctx.stroke();

        // Porte
        ctx.fillStyle = "#222";
        ctx.fillRect(this.x + this.width / 2 - 6, this.y + 15, 12, 25);
    }

    checkArrival(train) {
        return (
            train.x > this.x &&
            train.x < this.x + this.width &&
            train.y > this.y &&
            train.y < this.y + this.height
        );
    }
}
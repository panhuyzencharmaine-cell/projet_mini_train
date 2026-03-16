export class Train {
    constructor(color, x, y, speed) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.active = true;

        this.direction = "right"; 
        // right | up | down
    }

    update(junctions) {
        if (!this.active) return;

        if (this.direction === "right") {
            this.x += this.speed;

            junctions.forEach(j => {
                if (
                    Math.abs(this.x - j.x) < 3 &&
                    Math.abs(this.y - j.y) < 3
                ) {
                    if (j.state === 1) {
                        this.direction = j.branchDirection;
                    }
                }
            });
        }

        if (this.direction === "up") {
            this.y -= this.speed;
        }

        if (this.direction === "down") {
            this.y += this.speed;
        }
    }

    draw(ctx) {
        if (!this.active) return;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y - 8, 28, 14);

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x + 6, this.y + 6, 4, 0, Math.PI * 2);
        ctx.arc(this.x + 22, this.y + 6, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}
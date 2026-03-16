export class Junction {

    constructor(x, y, branchDirection = "up") {

        this.x = x;
        this.y = y;
        this.state = 0;
        this.radius = 18;
        this.branchDirection = branchDirection;
        this.rotation = 0;
    }

    toggle() {
        this.state = this.state === 0 ? 1 : 0;
    }

    isClicked(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        return Math.sqrt(dx * dx + dy * dy) < this.radius;
    }

    update() {
        this.rotation += this.state ? 0.08 : 0.02;
    }

    drawDoubleRailHorizontal(ctx, length = 50) {

        const gap = 6;

        ctx.strokeStyle = "#333";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(this.x - length, this.y - gap);
        ctx.lineTo(this.x + length, this.y - gap);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x - length, this.y + gap);
        ctx.lineTo(this.x + length, this.y + gap);
        ctx.stroke();
    }

   drawDoubleRailVertical(ctx) {

    const gap = 6;
    const railTop = this.branchDirection === "up"
        ? this.y - 170
        : this.y + 130;

    ctx.strokeStyle = "#444";
    ctx.lineWidth = 3;

    // Rail gauche
    ctx.beginPath();
    ctx.moveTo(this.x - gap, this.y);
    ctx.lineTo(this.x - gap, railTop);
    ctx.stroke();

    // Rail droit
    ctx.beginPath();
    ctx.moveTo(this.x + gap, this.y);
    ctx.lineTo(this.x + gap, railTop);
    ctx.stroke();
}

    draw(ctx) {
        // Petit joint central plus propre
ctx.beginPath();
ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
ctx.fillStyle = "white";
ctx.fill();
ctx.lineWidth = 3;
ctx.strokeStyle = "blue";
ctx.stroke();

        // Rails horizontaux doubles
        this.drawDoubleRailHorizontal(ctx);

        // Rail vertical double
        this.drawDoubleRailVertical(ctx);

        // Cercle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "blue";
        ctx.stroke();

        // X rotatif
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.beginPath();
        ctx.moveTo(-8, -8);
        ctx.lineTo(8, 8);
        ctx.moveTo(8, -8);
        ctx.lineTo(-8, 8);

        ctx.strokeStyle = this.state ? "red" : "blue";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
    }
}
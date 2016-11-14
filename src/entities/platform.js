export default class Platform {
    constructor(origin) {
        this.origin = origin;
    }

    draw(ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.origin.x, this.origin.y, 1, 1);
    }

    simulate() {}

}
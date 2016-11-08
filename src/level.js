import {ASPECT_RATIO} from './game-container';
const UNITS_TALL = 20;


export default class Level {
    constructor() {
        this.entities = [];
    }

    _preDraw() {

        // 20 units tall, origin starts in bottom left
        //  positive y goes up
        this.container.ctx.scale(this.container.height / UNITS_TALL, -1 * this.container.height / UNITS_TALL);
        this.container.ctx.translate(0, -1 * UNITS_TALL);

        this.container.ctx.save();
    }

    _postDraw() {

        this.container.ctx.restore();
    }

    draw() {
        this._preDraw();

        // TODO: Draw background
        // TODO: Draw entities
        // TODO: Draw HUD

        this.container.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        this.container.ctx.fillRect(0, 0, 1, 1);
        this.container.ctx.fillRect(UNITS_TALL * ASPECT_RATIO - 1, UNITS_TALL - 1, 1, 1);

        this._postDraw();
    }
}
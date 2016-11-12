import {ASPECT_RATIO} from './game-container';
const UNITS_TALL = 20;

import Player from './entities/player';
import Vec2 from 'victor';


export default class Level {
    constructor() {
        this.entities = [new Player(Vec2(5, 5))];
    }

    _preDraw() {
        // 20 units tall, origin starts in bottom left
        //  positive y goes up

        this.container.ctx.scale(this.container.height / UNITS_TALL, -1 * this.container.height / UNITS_TALL);
        this.container.ctx.translate(0, -1 * UNITS_TALL);

        this.container.ctx.save();

        // TODO: Move camera based on viewport
    }

    _postDraw() {

        this.container.ctx.restore();
    }

    draw() {
        this._preDraw();

        const drawingContext = this.container.ctx;

        for (const entity of this.entities) {
            entity.draw(drawingContext);
        }
        // TODO: Draw background

        // TODO: Intersect viewport with entities and draw the intersection

        // TODO: Draw HUD

        this.container.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        this.container.ctx.fillRect(0, 0, 1, 1);
        this.container.ctx.fillRect(UNITS_TALL * ASPECT_RATIO - 1, UNITS_TALL - 1, 1, 1);

        this._postDraw();
    }

    simulate() {
        for (const entity of this.entities) {
            entity.simulate();
        }
    }
}
import Player from './entities/player';
import Platform from './entities/platform';
import Vec2 from 'victor';
import Viewport from './viewport';

import { findAppropriateWidth } from './utils';

import { UNITS_TALL } from './config';
const UNITS_WIDE = findAppropriateWidth(UNITS_TALL);


export default class Level {
    constructor(levelFile) {
        this.entities = [];

        levelFile.forEach((row, y) => {
            y = UNITS_TALL - y;

            Array.prototype.forEach.call(row, (unit, x) => {
                switch (unit.toLowerCase()) {
                    case 'x':
                        this.entities.push(new Platform(Vec2(x, y)));
                        break;
                    case 'p':
                        this.player = new Player(Vec2(x, y));
                        this.entities.push(this.player);
                        break;
                }
            });
        });

        this.viewport = new Viewport(Vec2(UNITS_WIDE / 2, UNITS_TALL / 2), UNITS_TALL / 5, 1);
        this.showViewport = true;
    }

    _preDraw() {
        // 20 units tall, origin starts in bottom left
        //  positive y goes up

        this.container.ctx.scale(this.container.height / UNITS_TALL, -1 * this.container.height / UNITS_TALL);
        this.container.ctx.translate(0, -UNITS_TALL);


        const adjustedWidth = UNITS_WIDE / this.viewport.aabb.width;
        const adjustedHeight = UNITS_TALL / this.viewport.aabb.height;
        this.container.ctx.scale(adjustedWidth, adjustedHeight);
        this.container.ctx.translate(-this.viewport.aabb.lowerLeft.x, -this.viewport.aabb.lowerLeft.y);

        this.container.ctx.save();

        // TODO: Move camera based on viewport
    }

    _postDraw() {

        if (this.showViewport) {
            this.container.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            this.container.ctx.fillRect(this.viewport.aabb.lowerLeft.x, this.viewport.aabb.lowerLeft.y, this.viewport.aabb.width, this.viewport.aabb.height);
        }

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

        this._postDraw();
    }

    simulate() {
        for (const entity of this.entities) {
            entity.simulate();
        }

        this.viewport.updateViewport(this.player.physicsBody);
    }
}
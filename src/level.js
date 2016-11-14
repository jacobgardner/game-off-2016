import Player from './entities/player';
import Platform from './entities/platform';
import Vec2 from 'victor';

const UNITS_TALL = 20;


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
                        this.entities.push(new Player(Vec2(x, y)));
                        break;
                }
            });
        });
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

        this._postDraw();
    }

    simulate() {
        for (const entity of this.entities) {
            entity.simulate();
        }
    }
}
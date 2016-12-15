import AABB from '../aabb';
import Vec2 from 'victor';
import PhysicsBody from '../physics-body';

const PLAYER_WIDTH = 0.5;
const PLAYER_HEIGHT = 1;
const MOVE_SPEED = 5;
//const JUMP_VELOCITY = 9.82;

// Don't hate the player.  Hate the game.
export default class Enemy {
    /**
    * @param  {Vec2} origin The center, bottom of the player
    */
    constructor(origin) {
        this.name = 'Enemy';

        const lowerLeft = Vec2(origin.x - PLAYER_WIDTH / 2, origin.y);
        const upperRight = Vec2(origin.x + PLAYER_WIDTH / 2, origin.y + PLAYER_HEIGHT);
        const aabb = new AABB(lowerLeft, upperRight);
        this.physicsBody = new PhysicsBody(aabb);
        this.lastDirection = -1;
    }

    draw(ctx) {
        const {
            lowerLeft,
        } = this.physicsBody.aabb;

        ctx.fillStyle = '#FF0000';
        // NOTES: This works as long as the AABB dosn't change size for the player.
        ctx.fillRect(lowerLeft.x, lowerLeft.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }

    processAction() {
        const velocity = this.physicsBody.velocity;

        if (velocity.x === 0) {
            velocity.x = MOVE_SPEED * this.lastDirection;
            this.lastDirection = this.lastDirection * -1;
        }
    }

    simulate() {

        this.processAction();

    }
}

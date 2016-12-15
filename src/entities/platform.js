import AABB from '../aabb';
import Victor from 'victor';
import PhysicsBody from '../physics-body';

export default class Platform {
    constructor(origin) {
        this.origin = origin;

        this.physicsBody = new PhysicsBody(new AABB(origin, Victor(origin.x + 1, origin.y + 1)));
    }

    draw(ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.origin.x, this.origin.y, 1, 1);
    }

    simulate() {}

}

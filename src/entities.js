import PhysicsBody from './physics_body.js';
import {Rect} from './shapes.js';

export default class platformEntity {
	//physicsBody will go here
	class PhysicsBody {
        this.shape = Rect;
        this.position = position;
        this.velocity = velocity;
        this.accel = accel;
    }

	draw(ctx){
        this.ctx.fillStyle = 'rgba(255,255,255, 0.9)';
        this.ctx.fillRect(0, 100 , this.width, 25);
	}
}

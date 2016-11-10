import PhysicsBody from './physics_body.js';
import {Rect} from './shapes.js';

this.physicsBody = new PhysicsBody; 

export default class platformEntity {
	//physicsBody will go here

	this.physicsBody.constructor(Rect, position, velocity, accel)

	draw(ctx){
        this.ctx.fillStyle = 'rgba(255,255,255, 0.9)';
        this.ctx.fillRect(0, 100 , this.width, 25);
	}
}

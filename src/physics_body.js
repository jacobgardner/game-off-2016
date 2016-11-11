import Vec2 from 'vec2';
import Polygon from 'polygon';

export default class PhysicsBody {
    constructor(polygon, position, velocity, accel) {
        this.position = position.slice(); //[x,y] origin bottom left
        this.velocity = velocity.slice();//[units/s on x-axis, units/s on y-axis]
        this.accel = accel;// m/(s^2)
        this.inView = false;

        const center = polygon.center.toArray();
        
        this.polygon.translate(Vec2(this.position));
    }

    get x() {
        return this.position[0];
    }

    get clone() {
        const returnBody = new PhysicsBody (this.polygon.clone, this.position.toArray(), this.velocity.slice(), this.accel);
        returnBody.inVew = this.inView;

        return returnBody;
    }
}

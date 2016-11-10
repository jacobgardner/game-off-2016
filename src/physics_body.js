import Vec2 from 'vec2';
import Polygon from 'polygon';

export default class PhysicsBody {
    constructor(shape, position, velocity, accel) {
        this.shape = shape;
        this.polygon;//TODO build polygon
        this.position = Vec2.fromArray(position); //[x,y] origin bottom left
        this.velocity = velocity;//[units/s on x-axis, units/s on y-axis]
        this.accel = accel;
    }

    get x() {
        return this.position[0];
    }

    get clone() {
        const returnBody = new PhysicsBody (this.shape.clone, this.polygon.clone, this.position.toArray(), this.velocity.slice(), this.accel);

        return returnBody;
    }

}

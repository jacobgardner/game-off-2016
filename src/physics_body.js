import Vec2 from 'vec2';
import Polygon from 'polygon';

export default class PhysicsBody {
    constructor(shape, position, velocity, accel) {
        this.shape = shape;
        this.polygon;//TODO build polygon
        this.position = Vec2.fromArray(position); //[x,y] origin bottom left
        this.velocity = velocity;//
        this.accel = accel;
    }

    get x() {
        return position[0];
    }
}

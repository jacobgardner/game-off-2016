export default class PhysicsBody {
    constructor(shape, position, velocity, accel) {
        this.shape = shape;
        this.position = position;
        this.velocity = velocity;
        this.accel = accel;
    }
}

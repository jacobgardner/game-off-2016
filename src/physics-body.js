import AABB from './aabb';
import Victor from 'victor';

export default class PhysicsBody {
    constructor(aabb, position, velocity, accel) {
        this.aabb = aabb;
        const widthHeight = new Victor(this.w, this.h);
        this.aabb.add(position.subtract(this.aabb.lowerLeft), position.subtract(this.aabb.upperRight).add(widthHeight));

        this.velocity = velocity.slice();//[units/s on x-axis, units/s on y-axis]
        this.accel = accel;// Victor {x: u/(s^2), y: u/(s^2)}
        this.inView = false;
    }

    get x() {
        return this.aabb.lowerLeft.x;
    }

    get y() {
        return this.aabb.lowerLeft.y;
    }

    get w() {
        return this.aabb.upperRight.width;
    }

    get h() {
        return this.aabb.upperRight.height;
    }

    clone() {
        const returnBody = new PhysicsBody (new AABB(this.lowerLeft.clone(), this.upperRight.clone()), new Victor(this.x, this.y), this.velocity.slice(), this.accel.clone());
        returnBody.inVew = this.inView;

        return returnBody;
    }
}

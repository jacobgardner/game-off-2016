import AABB from './aabb';
import Vec2 from 'vec2';
import Polygon from 'polygon';

export default class PhysicsBody {
    constructor(aabb, polygon, position, velocity, accel) {
        this.aabb = aabb;
        this.position = position.slice(); //[x,y] origin bottom left
        this._polygon = polygon.translate(polygon.center.negate(), true);
        this.velocity = velocity.slice();//[units/s on x-axis, units/s on y-axis]
        this.accel = accel;// m/(s^2)
        this.inView = false;
    }

    /*get polygon() {
        return this._polygon.translate(Vec2.fromArray(this.position), true);
    }

    set polygon(newPolygon) {
        this._polygon = newPolygon.translate(newPolygon.center.negate(), true);
    }*/

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

    get clone() {
        const returnBody = new PhysicsBody (this._polygon.clone, this.position.toArray(), this.velocity.slice(), this.accel);
        returnBody.inVew = this.inView;

        return returnBody;
    }
}

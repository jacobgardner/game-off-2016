export default class AABB {
    constructor(lowerLeft, upperRight) {
        this._lowerLeft = lowerLeft;
        this._upperRight = upperRight;

        this._calculateDimensions();
    }

    _calculateDimensions() {
        this._dimensions = this._upperRight.clone().subtract(this._lowerLeft);
    }

    add(vec) {
        this._lowerLeft.add(vec);
        this._upperRight.add(vec);
    }

    subtract(vec) {
        this._lowerLeft.subtract(vec);
        this._upperRight.subtract(vec);
    }

    set position(vec) {
        const diff = vec.clone().subtract(this._lowerLeft);

        this._lowerLeft = vec;
        this._upperRight.add(diff);
    }

    get position() {
        return this._lowerLeft;
    }

    set lowerLeft(lowerLeft) {
        this._lowerLeft = lowerLeft;

        this._calculateDimensions();
    }

    get lowerLeft() {
        return this._lowerLeft;
    }

    set upperRight(upperRight) {
        this._upperRight = upperRight;

        this._calculateDimensions();
    }

    get upperRight() {
        return this._upperRight;
    }

    get width() {
        return this._dimensions.x;
    }

    get height() {
        return this._dimensions.y;
    }

    // This method protects dimensions from being modified accidentally
    get dimensions() {
        return this._dimensions.clone();
    }

    collisionWith(rhs) {
        return !(
            this._upperLeft.x < rhs._lowerLeft.x ||
            rhs._upperLeft.x < this._lowerLeft.x ||
            this._lowerLeft.y > rhs._upperLeft.y ||
            rhs._lowerLeft.y > this._upperLeft.y
        );
    }
}
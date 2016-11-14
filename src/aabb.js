export default class AABB {
    constructor(lowerLeft, upperRight) {
        this._lowerLeft = lowerLeft;
        this._upperRight = upperRight;

        this._calculateDimensions;
    }

    _calculateDimensions() {
        this.width = this._upperRight.x - this._lowerLeft.x;
        this.height = this._upperRight.y - this._lowerLeft.y;
    }

    add(vec) {
        this._lowerLeft.add(vec);
        this._upperRight.add(vec);
    }

    subtract(vec) {
        this._lowerLeft.subtract(vec);
        this._upperRight.subtract(vec);
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

    collisionWith(rhs) {
        return !(
            this._upperLeft.x < rhs._lowerLeft.x ||
            rhs._upperLeft.x < this._lowerLeft.x ||
            this._lowerLeft.y > rhs._upperLeft.y ||
            rhs._lowerLeft.y > this._upperLeft.y
        );
    }
}

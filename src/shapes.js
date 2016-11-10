class Shape {
    constructor(rotation = 0) {
        this.rotation = rotation; //rotation of shape in degrees
    }
}

export class Rect extends Shape {
    constructor(height, width, rotation) {
        super(rotation);
        this.height = height;
        this.width = width;
    }
}

export class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
}

export class Triangle extends Shape {
    constructor(height, base, offset, rotation) {
        super(rotation);
        this.height = height;
        this.base = base;
        this.offset = offset; //how much the top angle is offset from the center
            //of the base.  an offset of 0 is an isoscoles Triangle.  negative
            //offsets to the left.
    }
}

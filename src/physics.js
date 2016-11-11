import Vec2 from 'vec2';

export default class Physics {
    constructor(cameraBody, distanceFactor = 1.5, timeStep = 10, gravity = 9.82) {
        this.cameraBody = cameraBody;
        this.physicsBodyArr = new Array();
        this.distanceFactor = distanceFactor;
        this.timeStep = timeStep;
        this.gravity = gravity; //units/(s^2)
    }

    addBody(physicsBody) {
        this.physicsBodyArr.push(physicsBody);
        this.cameraSort();
    }

    resolveView() {
        this.cameraSort();

        for (const physicsBody of this.physicsBodyArr) {
            const physicsWindow = this.cameraBody.polygon.scale(this.distanceFactor, Vec2(this.cameraBody.position), true);
            if (physicsWindow.containsPoint(Vec2(physicsBody.position))) {
                this.resolveBody(physicsBody);
            } else if (physicsBody.postion[0] < physicsWindow.aabb().x
                    && physicsBody.postion[0] > physicsWindow.aabb().x + physicsWindow.aabb().w
                    && physicsBody.postion[1] < physicsWindow.aabb().y
                    && physicsBody.postion[1] > physicsWindow.aabb().x + physicsWindow.aabb().h) {

                break;//outside of physics bounds.
            }
        }

        return this;
    }

    resolveBody(physicsBody) {
        const tempBody = physicsBody.clone;

        tempBody.velocity[1] -= this.gravity * this.timeStep / 1000;
        for (let i = 0; i < tempBody.position.length; i++) {
            tempBody.position[i] += tempBody.velocity[i] * this.timeStep / 1000;
        }

        tempBody.position[1] = tempBody.position[1] < 0 ? 0 : tempBody.position[1];//TEST, everything fals to the ground

        //TODO collisions;
        this.inView = true; //TEST  Will possibly be removed later for better alternative.
        physicsBody = tempBody;
    }

    cameraSort() {
        this.physicsBodyArr.sort((a,b) => Vec2(a.position).distance(Vec2(this.cameraBody.position)) - Vec2(b.position).distance(Vec2(this.cameraBody.position)));//sort by closest to cameraBody

        return this;
    }
}

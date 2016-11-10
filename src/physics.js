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
            const physicsWindow = this.cameraBody.polygon.scale(this.distanceFactor, this.cameraBody.position, true);
            if (physicsWindow.containsPoint(physicsBody.position)) {
                this.resolveBody(physicsBody);
            } else if (physicsBody.position.toArray[0] < physicsWindow.aabb().x
                    && physicsBody.position.toArray[0] > physicsWindow.aabb().x + physicsWindow.aabb().w
                    && physicsBody.position.toArray[1] < physicsWindow.aabb().y
                    && physicsBody.position.toArray[1] > physicsWindow.aabb().x + physicsWindow.aabb().h) {

                break;//outside of physics bounds.
            }
        }

        return this;
    }

    resolveBody(physicsBody) {
        const tempBody = physicsBody.clone;
        tempBody.velocity[1] -= this.gravity * this.timeStep / 1000;
        tempBody.position.add(tempBody.velocity[0] * this.timeStep / 1000, tempBody.velocity[1] * this.timeStep / 1000);

        //TODO collisions;

        physicsBody = tempBody;
    }

    cameraSort() {
        this.physicsBodyArr.sort((a,b) => a.position.distance(this.cameraBody.position) - b.position.distance(this.cameraBody.position));//sort by closest to cameraBody

        return this;
    }
}

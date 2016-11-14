import QuadTree from 'simple-quadtree';
import Victor from 'victor';

export default class Physics {
    constructor(levelBoundArr, timeStep = 10, gravity = 9.82) {
        this.physicsBodyArr = new Array();
        this.timeStepfactor = timeStep/1000;
        this.gravity = gravity; //units/(s^2)
        this.quadTree = new QuadTree(0, 0, levelBoundArr[0], levelBoundArr[1]);
    }

    addBody(physicsBody) {
        physicsBody.quadID = this.physicsBodyArr.length;
        this.physicsBodyArr.push(physicsBody);
        this.quadTree.put(physicsBody);
    }

    resolveArea(viewPortPhysicsBody) {
        for (const physicsBody of this.physicsBodyArr) {
            physicsBody.inView = this.collides(physicsBody, viewPortPhysicsBody);
            this.resolveBody(physicsBody);
        }

        return this;
    }

    resolveBody(physicsBody) {
        physicsBody.velocity[1] += (physicsBody.accel.y - this.gravity) * this.timeStepFactor;

        if (physicsBody.velocity[1] !== 0) {
            this.quadTree.remove(physicsBody, 'quadID');
            physicsBody.aabb.add(new Victor(0, physicsBody.velocity[1] * this.timeStepFactor));
            this.quadTree.put(physicsBody);

            this.quadTree.get(physicsBody, (nearbyBody) => {
                if (nearbyBody.quadID !== physicsBody.quadID && this.collides(physicsBody, nearbyBody)) {
                    physicsBody.aabb.subtract(new Victor (0, physicsBody.velocity[1] * this.timeStepFactor));
                    physicsBody.velocity[1] = 0;

                    return false;
                } else {
                    return true;
                }
            });
        }

        physicsBody.velocity[0] += (physicsBody.accel.x) * this.timeStepFactor;

        if (physicsBody.velocity[0] !== 0) {
            this.quadTree.remove(physicsBody, 'quadID');
            physicsBody.aabb.add(new Victor(physicsBody.velocity[0] * this.timeStepFactor, 0));
            this.quadTree.put(physicsBody);

            this.quadTree.get(physicsBody, (nearbyBody) => {
                if (nearbyBody.quadID !== physicsBody.quadID && this.collides(physicsBody, nearbyBody)) {
                    physicsBody.aabb.subtract(new Victor (physicsBody.velocity[0] * this.timeStepFactor, 0));
                    physicsBody.velocity[0] = 0;

                    return false;
                } else {
                    return true;
                }
            });
        }

        if (physicsBody.y < 0) {
            const height = physicsBody.h;
            physicsBody.aabb.add(new Victor (physicsBody.x, 0), new Victor (physicsBody.aabb.upperRight.x, height));//test.  everything hits the ground;
            physicsBody.velocity[1] = 0;
        }

        return this;
    }

    collides(physicsBody1, physicsBody2) {
        return (physicsBody1.x < physicsBody2.x + physicsBody2.w &&
            physicsBody1.x + physicsBody1.w > physicsBody2.x &&
            physicsBody1.y < physicsBody2.y + physicsBody2.h &&
            physicsBody1.y + physicsBody1.h > physicsBody2.y);
    }
}

import AABB from './aabb';
import PhysicsBody from './physics-body';
import QuadTree from './quadtree';
import Victor from 'victor';

export default class Physics {
    constructor(levelBoundArr, timeStep = 10, gravity = 9.82) {
        this.physicsBodyArr = new Array();
        this.timeStepFactor = timeStep/1000;
        this.gravity = gravity; //units/(s^2)
        this.quadTree = new QuadTree(Victor(0, 0), Victor(levelBoundArr[0], levelBoundArr[1]));
        this.iDCount = 0;
    }

    addBody(physicsBody) {
        this.iDCount++;
        physicsBody.currentID = this.iDCount;
        this.physicsBodyArr.push(physicsBody);
        this.quadTree.put(physicsBody);
    }

    resolveArea(viewPortPhysicsBody) {
        for (const physicsBody of this.physicsBodyArr) {
            physicsBody.inView = this.collides(physicsBody, viewPortPhysicsBody);
            //physicsBody.inview = physicsBody.aabb.collisionWith(viewPortPhysicsBody.aabb);
            //if (physicsBody.inView) {
            this.resolveBody(physicsBody);
            //}
        }

        return this;
    }

    resolveBody(physicsBody) {
        physicsBody.velocity.add(Victor(0, (physicsBody.accel.y - this.gravity) * this.timeStepFactor));

        if (physicsBody.velocity.y !== 0) {
            this.quadTree.remove(physicsBody, 'currentID');
            physicsBody.aabb.add(Victor(0, physicsBody.velocity.y * this.timeStepFactor));
            this.quadTree.put(physicsBody);

            //const nearArr = this.quadTree.get(physicsBody);
            //console.log(`length: ${nearArr.length}`);

            let bool = true;
            for (const nearbyBody of this.physicsBodyArr) {//testing all first
                if (bool) {
                    if (nearbyBody.currentID !== physicsBody.currentID && this.collides(physicsBody, nearbyBody)) {
                    //if (nearbyBody.currentID !== physicsBody.currentID && physicsBody.aabb.collisionWith(nearbyBody.aabb)) {
                        this.quadTree.remove(physicsBody, 'currentID');
                        physicsBody.aabb.subtract(Victor(0, physicsBody.velocity.y * this.timeStepFactor));
                        physicsBody.velocity.y = 0;
                        this.quadTree.put(physicsBody);

                        bool = false;
                    } else {
                        bool = true;
                    }
                }
            }
        }

        physicsBody.velocity.add(Victor(physicsBody.accel.x * this.timeStepFactor, 0));

        if (physicsBody.velocity.x !== 0) {
            this.quadTree.remove(physicsBody, 'currentID');
            physicsBody.aabb.add(Victor(physicsBody.velocity.x * this.timeStepFactor, 0));
            this.quadTree.put(physicsBody);

            //const nearArr = this.quadTree.get(physicsBody);
            let bool = true;
            for (const nearbyBody of this.physicsBodyArr) {//Testing all first
                if (bool) {
                    if (nearbyBody.currentID !== physicsBody.currentID && this.collides(physicsBody, nearbyBody)) {
                        this.quadTree.remove(physicsBody, 'currentID');
                        physicsBody.aabb.subtract(Victor(physicsBody.velocity.x * this.timeStepFactor, 0));
                        physicsBody.velocity.x = 0;
                        this.quadTree.put(physicsBody);

                        bool = false;
                    } else {
                        bool = true;
                    }
                }
            }
        }

        if (physicsBody.y < 0) {
            physicsBody.aabb = new AABB(Victor(physicsBody.x, 0), Victor(physicsBody.w, physicsBody.h));//test.  everything hits the ground;
            physicsBody.velocity.y = 0;
        }

        if (physicsBody.x < 0) {
            physicsBody.aabb = new AABB(Victor(0, physicsBody.y), Victor(physicsBody.w, physicsBody.h));//test.  everything hits the ground;
            physicsBody.velocity.x = 0;
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

import Vec2 from 'vec2';
import Polygon from 'polygon';

class Physics {
    constructor(cameraBody, distanceFactor = 1.5) {
        this.cameraBody = cameraBody;
        this.physicsBodyArr = new Array();
        this.distanceFactor = distanceFactor;
    }

    addBody(physicsBody) {
        this.physicsBodyArr.push(physicsBody);
        this.cameraSort();
    }

    resolve() {
        this.cameraSort();

        for (const physicsBody of physicsBodyArr) {
            const physicsWindow = this.cameraBody.polygon.scale(this.distanceFactor, cameraBody.position, returnNew);
            if (physicsWindow.containsPoint(physicsBody.position)) {
                //TODO process physics
            } else if (physicsBody.position.toArray[0] < physicsWindow.aabb().x
                    && physicsBody.position.toArray[0] > physicsWindow.aabb().x + physicsWindow.aabb().w
                    && physicsBody.position.toArray[1] < physicsWindow.aabb().y
                    && physicsBody.position.toArray[1] > physicsWindow.aabb().x + physicsWindow.aabb().h) {

                break;//outside of physics bounds.
            }
        }

        return this;
    }

    cameraSort(){
        this.physicsBodyArr.sort((a,b) => a.position.distance(cameraBody.position) - b.position.distance(cameraBody.position));//sort by closest to cameraBody

        return this;
    }
}

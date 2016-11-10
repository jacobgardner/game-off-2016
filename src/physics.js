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
            } else {
                break;
            }
        }

        return this;
    }

    cameraSort(){
        this.physicsBodyArr.sort((a,b) => a.position.distance(cameraBody.position) - b.position.distance(cameraBody.position));//sort by closest to cameraBody

        return this;
    }
}

import { findAppropriateWidth } from './utils';
import AABB from './aabb';
import Vec2 from 'victor';

export default class Viewport {
    /**
     * [constructor description]
     * @param  {Vec2} center      Center of the viewport
     * @param  {Number} minHeight   Initial height (and minHeight) of the viewport
     * @param  {Number} buffer      The buffer area around the player to push the viewport around
     */
    constructor(center, minHeight, buffer=1) {
        const width = findAppropriateWidth(minHeight);
        this.aabb = new AABB(Vec2(center.x - width / 2, center.y - minHeight / 2), Vec2(center.x + width / 2, center.y + minHeight / 2));
        this.buffer = buffer;
    }

    /**
     * This updates the viewport position based on the previous size
     *     and the position of the player
     * @param  {PhysicsBody} physicsBody The player's physicsBody
     */
    updateViewport(physicsBody) {
        const {
            upperRight,
            lowerLeft,
        } = physicsBody.aabb;

        const push = Vec2(0, 0);


        if (upperRight.x + this.buffer > this.aabb.upperRight.x) {
            push.x = (upperRight.x + this.buffer) - this.aabb.upperRight.x;
        } else if (lowerLeft.x - this.buffer < this.aabb.lowerLeft.x) {
            push.x = (lowerLeft.x - this.buffer) - this.aabb.lowerLeft.x;
        }

        if (upperRight.y + this.buffer > this.aabb.upperRight.y) {
            push.y = (upperRight.y + this.buffer) - this.aabb.upperRight.y;
        } else if (lowerLeft.y - this.buffer < this.aabb.lowerLeft.y) {
            push.y = (lowerLeft.y - this.buffer) - this.aabb.lowerLeft.y;
        }

        this.aabb.add(push);
    }
}
import { findAppropriateWidth } from './utils';

export default class Viewport {
    /**
     * @param  {Vec2} origin      Should probably be the initial position of the player.
     * @param  {Number} minHeight [description]
     * @param  {Number} maxHeight [description]
     */
    constructor(origin, minHeight, maxHeight) {
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.currentHeight = minHeight;

        this.origin = origin.clone();
    }

    updateViewport(priorityEntities) {

    }
}
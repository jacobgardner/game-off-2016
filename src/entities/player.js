import AABB from '../aabb';
import Vec2 from 'victor';
// import PhysicsBody from '../physics-body';

const PLAYER_WIDTH = 0.5;
const PLAYER_HEIGHT = 1;
const MOVE_SPEED = 0.8;
const JUMP_VELOCITY = 1;

const KEYBINDINGS = {
    // Cardinal Directions
    LEFT: ['arrowleft', 'a'],
    RIGHT: ['arrowright', 'd'],
    DOWN: ['arrowdown', 's'],

    JUMP: ['arrowup', 'w'],

    ATTACK: [' '],
};

// Don't hate the player.  Hate the game.
export default class Player {
    /**
     * @param  {Vec2} origin The center, bottom of the player
     */
    constructor(origin) {
        const lowerLeft = Vec2(origin.x - PLAYER_WIDTH / 2, origin.y);
        const upperRight = Vec2(origin.x + PLAYER_WIDTH / 2, origin.y + PLAYER_HEIGHT);

        // TODO: Lookup this physics shit later
        // this.physicsBody = new PhysicsBody();
        this.physicsBody = {};
        this.physicsBody.aabb = new AABB(lowerLeft, upperRight);
        this.physicsBody.velocity = Vec2(0, 0);

        this.recordKeyDown = this.recordKeyDown.bind(this);
        this.recordKeyUp = this.recordKeyUp.bind(this);

        this.keyStates = {};

        this.enable();
    }

    draw(ctx) {
        const {
            lowerLeft,
        } = this.physicsBody.aabb;

        ctx.fillStyle = '#00FF00';
        // NOTES: This works as long as the AABB dosn't change size for the player.
        ctx.fillRect(lowerLeft.x, lowerLeft.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }

    processAction(actionName, isActive) {
        const velocity = this.physicsBody.velocity;

        switch (actionName) {
            case 'LEFT':
                velocity.x = isActive ? -MOVE_SPEED : 0;

                // TODO: Remove me once physics is merged
                this.physicsBody.aabb.add(Vec2(-MOVE_SPEED * 0.1, 0));
                break;
            case 'RIGHT':
                velocity.x = isActive ? MOVE_SPEED : 0;

                this.physicsBody.aabb.add(Vec2(MOVE_SPEED * 0.1, 0));
                break;
            case 'JUMP':
                // TODO: We'll need to actually check to see if we're falling or not
                //  velocity.y will be 0 at the top of jumps as well as when on the ground
                velocity.y = velocity.y === 0 ? JUMP_VELOCITY : velocity.y;
                break;
            case 'ATTACK':
                break;
        }
    }

    processInput() {
        for (const action of Object.keys(KEYBINDINGS)) {
            let isActive = false;
            for (const key of KEYBINDINGS[action]) {
                if (this.keyStates[key]) {
                    isActive = true;
                    break;
                }
            }

            if (isActive) {
                this.processAction(action, isActive);
            }
        }
    }

    simulate() {

        this.processInput();

    }

    decodeKey(evt) {
        if (evt.key !== undefined) {
            return evt.key.toLowerCase();
        } else {
            // NOTES: Safari does not support .key.  So we *SHOULD* probably
            //  make a table that translates .keyCode => .key
            //  For now, fuck macs
            throw new Error('Browser must currently support .key property on KeyboardEvent');
        }
    }

    recordKeyDown(evt) {
        this.keyStates[this.decodeKey(evt)] = true;
    }

    recordKeyUp (evt) {
        this.keyStates[this.decodeKey(evt)] = false;
    }

    enable() {
        window.addEventListener('keydown', this.recordKeyDown);
        window.addEventListener('keyup', this.recordKeyUp);
    }

    disable() {
        window.removeEventListener('keydown', this.recordKeyDown);
        window.removeEventListener('keyup', this.recordKeyUp);
    }
}
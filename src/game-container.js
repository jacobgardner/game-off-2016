import { SIMULATION_TIMESTEP, ASPECT_RATIO } from './config';

export default class GameContainer {
    constructor(canvas, initialScene) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stopping = false;

        this.renderLoop = this.renderLoop.bind(this);
        this.simulationLoop = this.simulationLoop.bind(this);

        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.lastFrameTime = Date.now();
        this.FPS = 0;

        this.sceneStack = [];

        if (initialScene) {
            this.pushScene(initialScene);
        }
    }

    pushScene(scene) {
        this.sceneStack.push(scene);
        scene.container = this;
    }

    resizeCanvas() {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if (this.canvas.height) {
            const ratio = this.width / this.height;

            if (ratio > ASPECT_RATIO) {
                // Too wide
                this.width = ASPECT_RATIO * this.height;
            } else {
                // Too thin
                this.height = this.width / ASPECT_RATIO;
            }
        }
    }

    preDraw() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);

        // This probably won't be needed once we start drawing
        //  a proper background
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate((this.canvas.width - this.width) / 2, (this.canvas.height - this.height) / 2);

        this.ctx.save();

    }
    
    postDraw() {
        this.ctx.restore();

        const now = Date.now();
        this.ctx.fillStyle = '#FF0000';
        this.ctx.textAlign = 'right';
        this.ctx.font = '16px sans-serif';

        this.FPS = this.FPS * 0.9 + (now - this.lastFrameTime) * 0.1;
        let dataStr = `FPS: ${Math.round(1000 / this.FPS)}`;

        for (const scene of this.sceneStack) {
            if (scene.entities) {
                const entity = scene.entities.find(element => element.name === 'Player');
                dataStr = `Player Pos: ${entity.physicsBody.x.toFixed(2)}, ${entity.physicsBody.y.toFixed(2)} | `
                    +`Player Velocity: ${entity.physicsBody.velocity.x.toFixed(2)}, ${entity.physicsBody.velocity.y.toFixed(2)} | `
                    +`Player Accel: ${entity.physicsBody.accel.x.toFixed(2)}, ${entity.physicsBody.accel.y.toFixed(2)} | `
                    +`currentID: ${entity.physicsBody.currentID} | `
                    + dataStr;
            }
        }

        this.ctx.fillText(dataStr, this.width - 10, 16);

        this.lastFrameTime = now;
    }

    renderLoop() {
        this.preDraw();

        for (const scene of this.sceneStack) {
            scene.draw(this.ctx);
        }

        this.postDraw();

        if (!this.stopping) {
            window.requestAnimationFrame(this.renderLoop);
        }
    }

    simulationLoop() {
        const startTime = window.performance.now();

        for (const scene of this.sceneStack) {
            scene.simulate();
        }

        const now = window.performance.now();

        if (!this.stopping) {
            setTimeout(this.simulationLoop, Math.max(0, SIMULATION_TIMESTEP - (now - startTime)));
        }

    }

    start() {
        this.stopping = false;

        window.requestAnimationFrame(this.renderLoop);
        this.simulationLoop();

        window.addEventListener('resize', this.resizeCanvas);
        this.resizeCanvas();
    }

    stop() {
        this.stopping = true;
        window.removeEventListener('resize', this.resizeCanvas);
    }
}

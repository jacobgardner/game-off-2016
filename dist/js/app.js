(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('gameCanvas-layer0');

// 1.6:1 aspect ratio
var ASPECT_RATIO = 1.6 / 1;
var UNITS_TALL = 20;

var Renderer = function () {
    function Renderer(canvas) {
        _classCallCheck(this, Renderer);

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stopping = false;

        this.gameLoop = this.gameLoop.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.lastFrameTime = Date.now();
        this.FPS = 0;
    }

    _createClass(Renderer, [{
        key: 'resizeCanvas',
        value: function resizeCanvas() {
            this.width = canvas.clientWidth;
            this.height = canvas.clientHeight;

            this.canvas.width = this.width;
            this.canvas.height = this.height;

            if (canvas.height) {
                var ratio = this.width / this.height;

                if (ratio > ASPECT_RATIO) {
                    // Too wide
                    this.width = ASPECT_RATIO * this.height;
                } else {
                    // Too thin
                    this.height = this.width / ASPECT_RATIO;
                }
            }
        }
    }, {
        key: 'gameLoop',
        value: function gameLoop() {
            this.preDraw();

            this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            this.ctx.fillRect(0, 0, 1, 1);
            this.ctx.fillRect(UNITS_TALL * ASPECT_RATIO - 1, UNITS_TALL - 1, 1, 1);

            this.postDraw();

            if (!this.stopping) {
                window.requestAnimationFrame(this.gameLoop);
            } else {
                this.stopping = false;
            }
        }
    }, {
        key: 'preDraw',
        value: function preDraw() {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);

            // This probably won't be needed once we start drawing
            //  a proper background
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate((this.canvas.width - this.width) / 2, (this.canvas.height - this.height) / 2);

            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.save();

            this.ctx.scale(this.height / UNITS_TALL, this.height / UNITS_TALL);
        }
    }, {
        key: 'postDraw',
        value: function postDraw() {
            this.ctx.restore();

            var now = Date.now();
            this.ctx.fillStyle = '#000000';
            this.ctx.textAlign = 'right';
            this.ctx.font = '16px sans-serif';

            this.FPS = this.FPS * 0.9 + (now - this.lastFrameTime) * 0.1;
            this.ctx.fillText('FPS: ' + Math.round(1000 / this.FPS), this.width - 10, 16);

            this.lastFrameTime = now;
        }
    }, {
        key: 'start',
        value: function start() {
            window.requestAnimationFrame(this.gameLoop);
            window.addEventListener('resize', this.resizeCanvas);
            this.resizeCanvas();
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.stopping = true;
            window.removeEventListener('resize', this.resizeCanvas);
        }
    }]);

    return Renderer;
}();

var r = new Renderer(canvas);
r.start();

},{}]},{},[1])


//# sourceMappingURL=app.js.map

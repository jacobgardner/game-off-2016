import Level from './level';
import GameContainer from './game-container';

import testLevel from './levels/test';

const canvas = document.getElementById('gameCanvas-layer0');

const game = new GameContainer(canvas);
game.pushScene(new Level(testLevel));
game.start();

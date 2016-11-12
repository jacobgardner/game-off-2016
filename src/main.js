import Level from './level';
import GameContainer from './game-container';

const canvas = document.getElementById('gameCanvas-layer0');

const game = new GameContainer(canvas);
game.pushScene(new Level());
game.start();

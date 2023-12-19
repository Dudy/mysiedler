import CanvasManager from './canvasManager.js';
import Hexagon from './hexagon.js';

const WIDTH = 5;
const HEIGHT = 5;

const RADIUS = 20;
const HEXAGON_WIDTH = 1.5 * RADIUS;
const HEXAGON_HEIGHT = Math.sqrt(3) * RADIUS;
const VERTICAL_OFFSET = HEXAGON_HEIGHT * 0.5;

let xOffset = 50;
let yOffset = 50;

document.addEventListener('DOMContentLoaded', () => {
    const canvasManager = new CanvasManager('myCanvas');
    const canvasWidth = canvasManager.canvas.width;
    const canvasHeight = canvasManager.canvas.height;
    let maxWidth = Math.min(WIDTH * HEXAGON_WIDTH, canvasWidth);
    let maxHeight = Math.min(HEIGHT * HEXAGON_HEIGHT, canvasHeight);

    for (let y = 0; y < maxHeight; y += HEXAGON_HEIGHT) {
        for (let x = 0; x < maxWidth; x += HEXAGON_WIDTH) {
            const adjustedY = y + (x / HEXAGON_WIDTH % 2) * VERTICAL_OFFSET;
            const hexagon = new Hexagon(x, adjustedY, RADIUS);
            canvasManager.addHexagon(hexagon);
        }
    }

    canvasManager.draw(xOffset, yOffset);
});

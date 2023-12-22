import Hexagon from './hexagon.js';
import CanvasManager from "./canvasManager.js";
import {HEIGHT, WIDTH} from "./config.js";

function setNeighbors(hexagons) {
    for (let row = 0; row < HEIGHT; row++) {
        for (let column = 0; column < WIDTH; column++) {
            const hexagon = hexagons[row][column];
            const evenColumn = column % 2 === 0;
            const maxRow = HEIGHT - 1;
            const maxColumn = WIDTH - 1;

            // top
            const top = row > 0 ? hexagons[row - 1][column] : hexagons[maxRow][column];

            // topRight
            let topRight;
            let columnIndex;
            if (column === maxColumn) {
                columnIndex = 0;
            } else {
                columnIndex = column + 1;
            }
            let rowIndex;
            if (column === maxColumn) {
                rowIndex = row;
            } else if (row === 0) {
                rowIndex = maxRow;
            } else {
                rowIndex = row - 1;
            }
            topRight = hexagons[rowIndex][columnIndex];

            // bottomRight
            let bottomRight;
            if (column === maxColumn) {
                columnIndex = 0;
            } else {
                columnIndex = column + 1;
            }
            if (evenColumn) {
                rowIndex = row;
            } else if (row === maxRow) {
                rowIndex = 0;
            } else {
                rowIndex = row + 1;
            }
            bottomRight = hexagons[rowIndex][columnIndex];

            // bottom
            const bottom = row < maxRow ? hexagons[row + 1][column] : hexagons[0][column];

            // bottomLeft
            let bottomLeft;
            if (column === 0) {
                columnIndex = maxColumn;
            } else {
                columnIndex = column - 1;
            }
            if (evenColumn) {
                rowIndex = row;
            } else if (row === maxRow) {
                rowIndex = 0;
            } else {
                rowIndex = row + 1;
            }
            bottomLeft = hexagons[rowIndex][columnIndex];

            // topLeft
            let topLeft;
            if (column === 0) {
                columnIndex = maxColumn;
            } else {
                columnIndex = column - 1;
            }
            if (!evenColumn) {
                rowIndex = row;
            } else if (row === 0) {
                rowIndex = maxRow;
            } else {
                rowIndex = row - 1;
            }
            topLeft = hexagons[rowIndex][columnIndex];

            hexagon.setNeighbors(top, topRight, bottomRight, bottom, bottomLeft, topLeft);
        }
    }
}

function createHexagons() {
    const hexagons = Array.from({length: HEIGHT}, () => new Array(WIDTH));
    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            hexagons[row][col] = new Hexagon(col, row);
        }
    }
    setNeighbors(hexagons);
    return hexagons;
}

document.addEventListener('DOMContentLoaded', () => {
    let hexagons = createHexagons();
    new CanvasManager('myCanvas', hexagons);
});

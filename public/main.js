import Hexagon from './hexagon.js';
import CanvasManager from "./canvasManager.js";
import {HEIGHT, RANDOM, resourceCount, resources, flags, WIDTH} from "./config.js";
import OverviewCanvasManager from "./overviewCanvasManager.js";

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

function setResources(hexagons) {
    const hexagonCount = HEIGHT * WIDTH;
    const resourceDistribution = [];

    // everything is grass at first
    for (let i = 0; i < hexagonCount; i++) {
        resourceDistribution.push('grass');
    }

    // some water
    const numberOfWaterFields = RANDOM.randomInt(10) + 5;
    for (let i = 0; i < numberOfWaterFields; i++) {
        const waterFieldSize = RANDOM.randomInt(10) + 10;
        const waterFieldX = RANDOM.randomInt(WIDTH - waterFieldSize);
        const waterFieldY = RANDOM.randomInt(HEIGHT - waterFieldSize);
        for (let row = waterFieldY; row < waterFieldY + waterFieldSize; row++) {
            for (let col = waterFieldX; col < waterFieldX + waterFieldSize; col++) {
                resourceDistribution[row * WIDTH + col] = 'water';
            }
        }
    }

    // a few stones
    const numberOfStoneFields = RANDOM.randomInt(5) + 5;
    for (let i = 0; i < numberOfStoneFields; i++) {
        const stoneFieldSize = RANDOM.randomInt(10) + 5;
        const stoneFieldX = RANDOM.randomInt(WIDTH - stoneFieldSize);
        const stoneFieldY = RANDOM.randomInt(HEIGHT - stoneFieldSize);
        for (let row = stoneFieldY; row < stoneFieldY + stoneFieldSize; row++) {
            for (let col = stoneFieldX; col < stoneFieldX + stoneFieldSize; col++) {
                if (resourceDistribution[row * WIDTH + col] !== 'grass') {
                    continue;
                }
                resourceDistribution[row * WIDTH + col] = 'stone';
            }
        }
    }

    // a few trees
    const numberOfWoodFields = RANDOM.randomInt(5) + 5;
    for (let i = 0; i < numberOfWoodFields; i++) {
        const woodFieldSize = RANDOM.randomInt(10) + 5;
        const woodFieldX = RANDOM.randomInt(WIDTH - woodFieldSize);
        const woodFieldY = RANDOM.randomInt(HEIGHT - woodFieldSize);
        for (let row = woodFieldY; row < woodFieldY + woodFieldSize; row++) {
            for (let col = woodFieldX; col < woodFieldX + woodFieldSize; col++) {
                if (resourceDistribution[row * WIDTH + col] !== 'grass') {
                    continue;
                }
                resourceDistribution[row * WIDTH + col] = 'wood';
            }
        }
    }

    let resourceIndex = 0;
    for (let row = 0; row < HEIGHT; row++) {
        for (let column = 0; column < WIDTH; column++) {
            const hexagon = hexagons[row][column];
            if (hexagon.resource === undefined) {
                const resource = resourceDistribution[resourceIndex++];
                hexagon.resource = resource;
                if (resource !== 'desert' && resource !== 'water') {
                    resourceCount[resource]--;
                    if (resourceCount[resource] === 0) {
                        resources.splice(resources.indexOf(resource), 1);
                    }
                }
            }
        }
    }
}

function createHexagons() {
    const hexagons = Array.from({length: HEIGHT}, () => new Array(WIDTH));
    let counter = 0;
    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            hexagons[row][col] = new Hexagon(col, row, counter++);
        }
    }

    setNeighbors(hexagons);
    setResources(hexagons);

    return hexagons;
}

document.addEventListener('DOMContentLoaded', () => {
    let hexagons = createHexagons();
    new CanvasManager('myCanvas', hexagons);
    new OverviewCanvasManager('overviewCanvas', hexagons);
});

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'c':
            flags.showHexagonCoordinates = !flags.showHexagonCoordinates;
            break;
        case 'b':
            flags.showHexagonBorder = !flags.showHexagonBorder;
            break;
    }
});

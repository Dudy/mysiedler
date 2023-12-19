import Hexagon from "./hexagon.js";
import Directions from "./directions.js";

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const RADIUS = 20;
const X_VERSATZ = 1.5 * RADIUS;
const Y_VERSATZ = 0.5 * RADIUS * Math.sqrt(3);

// const Directions = Object.freeze({
//     oben: Symbol("oben"),
//     rechtsoben: Symbol("rechtsoben"),
//     rechtsunten: Symbol("rechtsunten"),
//     unten: Symbol("unten"),
//     linksunten: Symbol("linksunten"),
//     linksoben: Symbol("linksoben")
// });
//
// const getDirectionPlus = function (direction, steps) {
//     const directionsArray = Object.values(Directions);
//     const currentIndex = directionsArray.indexOf(direction);
//     const newIndex = (currentIndex + steps + directionsArray.length) % directionsArray.length;
//     return directionsArray[newIndex];
// };

function drawSingleHexagon(x, y, color = "black", number) {
    context.beginPath();
    for (let angle = 0; angle < 360; angle += 60) {
        let posX = x + RADIUS * Math.cos(Math.PI * angle / 180);
        let posY = y + RADIUS * Math.sin(Math.PI * angle / 180);

        if (angle === 0) {
            context.moveTo(posX, posY);
        } else {
            context.lineTo(posX, posY);
        }
    }

    if (number) {
        context.font = "10px Arial";
        context.fillText(number, x - 5, y + 5);
    }

    context.closePath();
    context.strokeStyle = color;
    context.stroke();
}


// "quadratisches" Spielfeld 2 * (3 * 3) = 18 Felder (aber halt als Hexagone)
//         3*3 für x-Werte, 3x3 für y-Werte
const n = 3;
// diese Variable enthält das Spielfeld als zweidimensionales Array der Größe (2n x 2n), es ist aber nur jedes zweite Feld gefüllt
const field = new Array(2 * n);

const createField = function () {
    for (let i = 0; i < n; i++) {
        const indexX = i * 2;
        field[indexX] = new Array(2 * n);
        field[indexX + 1] = new Array(2 * n);
        for (let j = 0; j < n; j++) {
            const indexY = j * 2;
            field[indexX][indexY] = new Hexagon(indexX, indexY);
            field[indexX + 1][indexY + 1] = new Hexagon(indexX + 1, indexY + 1);
        }
    }
}

const overflow = function (coordinate) {
    const offset = coordinate % 2 === 0 ? 0 : 1;
    if (coordinate < offset) {
        return 2 * (n - 1) + offset;
    } else if (coordinate > 2 * (n - 1) + offset) {
        return offset;
    } else {
        return coordinate;
    }
}

const connectHexagons = function () {
    for (let indexX = 0; indexX < 2 * n; indexX++) {
        for (let indexY = 0; indexY < 2 * n; indexY++) {
            if ((indexX % 2 === 0 && indexY % 2 === 0) ||
                (indexX % 2 === 1 && indexY % 2 === 1)) {
                const hexagon = field[indexX][indexY];
                hexagon.oben = field[overflow(indexX)][overflow(indexY - 2)];
                hexagon.rechtsoben = field[overflow(indexX + 1)][overflow(indexY - 1)];
                hexagon.rechtsunten = field[overflow(indexX + 1)][overflow(indexY + 1)];
                hexagon.unten = field[overflow(indexX)][overflow(indexY + 2)];
                hexagon.linksunten = field[overflow(indexX - 1)][overflow(indexY + 1)];
                hexagon.linksoben = field[overflow(indexX - 1)][overflow(indexY - 1)];
            }
        }
    }
}

const drawOrigin = function () {
    context.beginPath();
    context.moveTo(rootOffsetX - 5, rootOffsetY);
    context.lineTo(rootOffsetX + 5, rootOffsetY);
    context.moveTo(rootOffsetX, rootOffsetY - 5);
    context.lineTo(rootOffsetX, rootOffsetY + 5);

    context.font = "9px Arial";
    context.fillText(`(${rootOffsetX},${rootOffsetY})`, rootOffsetX - 14, rootOffsetY + 3);

    context.closePath();
    context.strokeStyle = "green";
    context.stroke();
}

function drawHexagon(hexagon, color = "black", xOffset = 0, yOffset = 0, output = false) {
    const x = rootOffsetX + xOffset + hexagon.x * X_VERSATZ;
    const y = rootOffsetY + yOffset + hexagon.y * Y_VERSATZ;

    if (output) {
        console.log(`x: ${x}, y: ${y}`);
    }

    context.beginPath();

    for (let angle = 0; angle < 360; angle += 60) {
        let posX = x + RADIUS * Math.cos(Math.PI * angle / 180);
        let posY = y + RADIUS * Math.sin(Math.PI * angle / 180);

        if (output) {
            console.log(`angle: ${angle}, posX: ${posX}, posY: ${posY}`);
        }

        if (angle === 0) {
            context.moveTo(posX, posY);
        } else {
            context.lineTo(posX, posY);
        }
    }

    context.font = "9px Arial";
    context.fillText(`(${hexagon.x},${hexagon.y})`, x - 14, y + 3);

    context.closePath();
    context.strokeStyle = color;
    context.stroke();
}

const draw1 = function () {
    let startX = root;
    let startY = root;
    let current = root;

    do {
        do {
            drawHexagon(current, "green");
            current = current.rechtsunten;
            drawHexagon(current, "blue");
            current = current.rechtsoben;
        } while (current !== startX);
        startX = startX.unten;
        current = startX;
    } while (current !== startY);


    let xBlockOffset = (n + 3) * X_VERSATZ;
    let yBlockOffset = (n + 1) * Y_VERSATZ;
    //
    let xOffset = 0;
    let yOffset = 0;
    //
    // startX = root;
    // startY = root;
    // current = root;
    // do {
    //     do {
    //         drawHexagon(current, "red", xOffset, yOffset);
    //         current = current.linksunten;
    //         drawHexagon(current, "yellow", xOffset, yOffset);
    //         current = current.linksoben;
    //         xOffset -= X_VERSATZ;
    //     } while (current !== startX);
    //     startX = startX.unten;
    //     current = startX;
    //     // yOffset -= Y_VERSATZ;
    // } while (current !== startY);


    // drawHexagon(root, "red");
    // console.log("root");
    // console.log(root);
    console.log(`rootOffsetX: ${rootOffsetX}, rootOffsetY: ${rootOffsetY}`);
    console.log(`xBlockOffset: ${xBlockOffset}, yBlockOffset: ${yBlockOffset}`);
    current = current.linksunten;
    console.log(current);
    xOffset -= xBlockOffset;

    // xOffset = 0;
    // yOffset = 0;

    console.log(`is visible: ${current.isVisible(rootOffsetX, xOffset)}`);
    console.log(`is visible here: ${isHexagonVisible(xOffset, current)}`);

    // if (isHexagonVisible(xOffset, current)) {
    if (current.isVisible(rootOffsetX, xOffset)) {
        drawHexagon(current, "yellow", xOffset, yOffset, false);
    }
    // console.log(xOffset);
    // console.log(yOffset);
}

const draw = function () {
    let xBlockOffset = (n + 3) * X_VERSATZ;
    let yBlockOffset = (n + 3) * Y_VERSATZ;
    let xOffset = 0;
    let yOffset = 0;

    let startX = root;
    let startY = root;
    let current = root;

    let direction = Directions.linksunten;
    let color = "green";

    while (current.isVisible(rootOffsetX, xOffset, rootOffsetY, yOffset)) {
        if (current === startX) {
            xOffset -= xBlockOffset;
            // console.log(`xOffset is now ${xOffset}`);
        }

        current = current.getNeighbour(direction);
        if (direction === Directions.linksunten) {
            direction = Directions.linksoben;
        } else {
            direction = Directions.linksunten;
        }
    }

    if (direction === Directions.linksunten) {
        direction = Directions.rechtsunten;
    } else {
        direction = Directions.rechtsoben;
    }

    current = current.getNeighbour(direction);

    startY = current;
    let i = 0;
    while (i < 20 && current.isVisible(rootOffsetX, xOffset, rootOffsetY, yOffset)) {
        console.log(`i: ${i++}`);
        if (current === startY) {
            yOffset -= yBlockOffset;
            console.log(`yOffset is now ${yOffset}`);
        }

        current = current.getNeighbour(Directions.oben);
        i++;
    }

    //exit();

    startX = current;
    startY = current;

    // if (direction === Directions.linksunten) {
    //     direction = Directions.rechtsunten;
    //     color = "green";
    // } else {
    //     direction = Directions.rechtsoben;
    //     color = "blue";
    // }

    do {
        do {
            drawHexagon(current, color, xOffset, yOffset);
            current = current.getNeighbour(direction);

            if (direction === Directions.rechtsunten) {
                direction = Directions.rechtsoben;
                color = "blue";
            } else {
                direction = Directions.rechtsunten;
                color = "green";
            }

            if (current === startX) {
                xOffset += xBlockOffset;
            }
        } while (current.isVisible(rootOffsetX, xOffset, rootOffsetY, yOffset));
        direction = Directions.rechtsunten;
        color = "green";
        startX = startX.unten;
        current = startX;
        xOffset = 0;
        if (current === startY) {
            yOffset += yBlockOffset;
        }
    } while (current.isVisible(rootOffsetX, xOffset, rootOffsetY, yOffset));


    // do {
    //     do {
    //         drawHexagon(current, "green", xOffset, yOffset);
    //         current = current.rechtsunten;
    //         drawHexagon(current, "blue", xOffset, yOffset);
    //         current = current.rechtsoben;
    //
    //         if (current === startX) {
    //             xOffset += xBlockOffset;
    //         }
    //     } while (current.isVisible(rootOffsetX, xOffset));
    //     startX = startX.unten;
    //     current = startX;
    //     xOffset = 0;
    // } while (current !== startY);



    // console.log(`rootOffsetX: ${rootOffsetX}, rootOffsetY: ${rootOffsetY}`);
    // console.log(`xBlockOffset: ${xBlockOffset}, yBlockOffset: ${yBlockOffset}`);
    // current = current.linksunten;
    // console.log(current);
    // xOffset -= xBlockOffset;
    // console.log(`is visible: ${current.isVisible(rootOffsetX, xOffset)}`);
    // console.log(`is visible here: ${isHexagonVisible(xOffset, current)}`);
    // if (current.isVisible(rootOffsetX, xOffset)) {
    //     drawHexagon(current, "yellow", xOffset, yOffset, false);
    // }
}

createField();
connectHexagons();

const root = field[0][0];

let rootOffsetX = 50;
let rootOffsetY = 50;

function registerEventListeners() {
    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const hexagon = getHexagon(x, y);
        console.log(hexagon);

        if (hexagon) {
            drawHexagon(hexagon, "red");
        }
    });

    // canvas.addEventListener('mousemove', function (event) {
    //     const rect = canvas.getBoundingClientRect();
    //     const x = event.clientX - rect.left;
    //     const y = event.clientY - rect.top;
    //
    //     const hexagon = getHexagon(x, y);
    //     console.log(hexagon);
    //
    //     if (hexagon) {
    //         drawHexagon(hexagon, "red");
    //     }
    // });

    document.addEventListener('keydown', function (event) {
        // use WASD to change rootOffsetX and rootOffsetY
        switch (event.key) {
            case "w":
                rootOffsetY += 10;
                break;
            case "a":
                rootOffsetX += 10;
                break;
            case "s":
                rootOffsetY -= 10;
                break;
            case "d":
                rootOffsetX -= 10;
                break;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        // drawOrigin();
    });
}

function getHexagon(x, y) {
    const xIndex = Math.round((x - rootOffsetX) / X_VERSATZ);
    const yIndex = Math.round((y - rootOffsetY) / Y_VERSATZ);

    // TODO
    if (xIndex % 2 === 0) {
        return field[xIndex][yIndex];
    } else {
        return field[xIndex][yIndex];
    }
}

function isHexagonVisible(xOffset, hexagon) {
    let posX = rootOffsetX + xOffset + hexagon.x * X_VERSATZ + RADIUS;
    return posX >= 0;
}

registerEventListeners();
draw();
console.log("done");
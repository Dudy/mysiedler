const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const RADIUS = 20;
const X_VERSATZ = 1.5 * RADIUS;
const Y_VERSATZ = 0.5 * RADIUS * Math.sqrt(3);

const Directions = Object.freeze({
    oben: Symbol("oben"),
    rechtsoben: Symbol("rechtsoben"),
    rechtsunten: Symbol("rechtsunten"),
    unten: Symbol("unten"),
    linksunten: Symbol("linksunten"),
    linksoben: Symbol("linksoben")
});

const getDirectionPlus = function (direction, steps) {
    const directionsArray = Object.values(Directions);
    const currentIndex = directionsArray.indexOf(direction);
    const newIndex = (currentIndex + steps + directionsArray.length) % directionsArray.length;
    return directionsArray[newIndex];
};

function Hexagon(x, y, references = {}) {
    let hexagon = {
        x: x,
        y: y,
        oben: null,
        rechtsoben: null,
        rechtsunten: null,
        unten: null,
        linksunten: null,
        linksoben: null
    };

    Object.assign(hexagon, references);
    return hexagon;
}

const nextX = function (hexagon, direction) {
    switch (direction) {
        case Directions.oben:
        case Directions.unten:
            return hexagon.x;
        case Directions.rechtsoben:
        case Directions.rechtsunten:
            return hexagon.x + 1.5 * RADIUS;
        case Directions.linksoben:
        case Directions.linksunten:
            return hexagon.x - 1.5 * RADIUS;
    }
}

const nextY = function (hexagon, direction) {
    switch (direction) {
        case Directions.oben:
        case Directions.unten:
            return hexagon.y + RADIUS * Math.sqrt(3);
        case Directions.rechtsoben:
        case Directions.rechtsunten:
            return hexagon.y + 0.5 * RADIUS * Math.sqrt(3);
        case Directions.linksoben:
        case Directions.linksunten:
            return hexagon.y - 0.5 * RADIUS * Math.sqrt(3);
    }
}

const nextHexagon = function (current) {
    const direction = current[checkDirection.description] ? goDirection : checkDirection;
    console.log(direction);

    const x = nextX(current, direction);
    const y = nextY(current, direction);

    console.log(`diffX: ${stopX - x}, diffY: ${stopY - y}`);

    if (x === stopX && y === stopY) {
        return;
    }

    const references = {
        [getDirectionPlus(current.direction, 2)]: root, // computed property name:     [f(x)]: y
        [getDirectionPlus(current.direction, 3)]: current
    }

    current[direction] = Hexagon(x, y, references);

    drawSingleHexagon(current[direction].x, current[direction].y);

    //nextHexagon(current[direction]);
}

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


















// "quadratisches" Spielfeld 10x10 Felder (aber halt als Hexagone)
const n = 20;
// diese Variable enthält das Spielfeld als zweidimensionales Array der Größe nxn
const feld = new Array(n);

for (let i = 0; i < n; i++) {
    const indexX = i * 2;
    feld[indexX] = new Array(n);
    feld[indexX + 1] = new Array(n);
    for (let j = 0; j < n; j++) {
        const indexY = j * 2;
        feld[indexX][indexY] = Hexagon(indexX, indexY);
        feld[indexX + 1][indexY + 1] = Hexagon(indexX + 1, indexY + 1);
    }
}

const boundsEven = function (coordinate) {
    if (coordinate < 0) {
        return 2 * (n - 1);
    } else if (coordinate > 2 * (n - 1)) {
        return 0;
    } else {
        return coordinate;
    }
}

const boundsOdd = function (coordinate) {
    if (coordinate < 1) {
        return 2 * (n - 1) + 1;
    } else if (coordinate > 2 * (n - 1) + 1) {
        return 1;
    } else {
        return coordinate;
    }
}

for (let i = 0; i < n; i++) {
    const indexX = i * 2;
    for (let j = 0; j < n; j++) {
        const indexY = j * 2;
        const hexagon = feld[indexX][indexY];
        hexagon.oben = feld[boundsEven(indexX - 2)][boundsEven(indexY)];
        hexagon.rechtsoben = feld[boundsOdd(indexX - 1)][boundsOdd(indexY + 1)];
        hexagon.rechtsunten = feld[boundsOdd(indexX + 1)][boundsOdd(indexY + 1)];
        hexagon.unten = feld[boundsEven(indexX + 2)][boundsEven(indexY)];
        hexagon.linksunten = feld[boundsOdd(indexX + 1)][boundsOdd(indexY - 1)];
        hexagon.linksoben = feld[boundsOdd(indexX - 1)][boundsOdd(indexY - 1)];
    }
}

for (let i = 0; i < n; i++) {
    const indexX = i * 2 + 1;
    for (let j = 0; j < n; j++) {
        const indexY = j * 2 + 1;
        const hexagon = feld[indexX][indexY];
        hexagon.oben = feld[boundsOdd(indexX - 2)][boundsOdd(indexY)];
        hexagon.rechtsoben = feld[boundsEven(indexX - 1)][boundsEven(indexY + 1)];
        hexagon.rechtsunten = feld[boundsEven(indexX + 1)][boundsEven(indexY + 1)];
        hexagon.unten = feld[boundsOdd(indexX + 2)][boundsOdd(indexY)];
        hexagon.linksunten = feld[boundsEven(indexX + 1)][boundsEven(indexY - 1)];
        hexagon.linksoben = feld[boundsEven(indexX - 1)][boundsEven(indexY - 1)];
    }
}

const root = feld[0][0];

const rootOffsetX = 0;
const rootOffsetY = 0;

context.beginPath();
context.moveTo(rootOffsetX - 5, rootOffsetY);
context.lineTo(rootOffsetX + 5, rootOffsetY);
context.moveTo(rootOffsetX, rootOffsetY - 5);
context.lineTo(rootOffsetX, rootOffsetY + 5);
context.closePath();
context.strokeStyle = "green";
context.stroke();

const draw1 = function () {
    for (let i = 0; i < n; i++) {
        const indexX = i * 2;
        for (let j = 0; j < n; j++) {
            const indexY = j * 2;

            const hexagon = feld[indexX][indexY];
            if (hexagon) {
                console.log(`hexagon ${indexX}, ${indexY}: ${hexagon.x}, ${hexagon.y}`);
            }
            drawSingleHexagon(rootOffsetX + feld[indexX][indexY].x * X_VERSATZ, rootOffsetY + feld[indexX][indexY].y * Y_VERSATZ, "black", i * n + j);
            drawSingleHexagon(rootOffsetX + feld[indexX + 1][indexY + 1].x * X_VERSATZ, rootOffsetY + feld[indexX + 1][indexY + 1].y * Y_VERSATZ, "black", i * n + j);
        }
    }
}


const draw2 = function () {
    let startX = root;
    let startY = root;
    let current = root;

    do {
        do {
            drawSingleHexagon(rootOffsetX + current.x * X_VERSATZ, rootOffsetY + current.y * Y_VERSATZ, "green");
            current = current.rechtsunten;
            drawSingleHexagon(rootOffsetX + current.x * X_VERSATZ, rootOffsetY + current.y * Y_VERSATZ, "blue");
            current = current.rechtsoben;
        } while (current !== startX);
        startX = startX.unten;
        current = startX;
    } while (current !== startY);
}


//function drawSingleHexagon(x, y, color = "black", number) {

function drawHexagon(hexagon, color = "black") {
    const x = rootOffsetX + hexagon.x * X_VERSATZ;
    const y = rootOffsetY + hexagon.y * Y_VERSATZ;

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

    context.font = "9px Arial";
    context.fillText(`(${hexagon.x},${hexagon.y})`, x - 14, y + 3);

    context.closePath();
    context.strokeStyle = color;
    context.stroke();
}

const draw = function () {
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
}

draw();
console.log("done");
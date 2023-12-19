const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const RADIUS = 20;

const Directions = Object.freeze({
    oben: Symbol("oben"),
    rechtsoben: Symbol("rechtsoben"),
    rechtsunten: Symbol("rechtsunten"),
    unten: Symbol("unten"),
    linksunten: Symbol("linksunten"),
    linksoben: Symbol("linksoben")
});

const getDirectionPlus = function(direction, steps) {
    const directionsArray = Object.values(Directions);
    const currentIndex = directionsArray.indexOf(direction);
    const newIndex = (currentIndex + steps + directionsArray.length) % directionsArray.length;
    return directionsArray[newIndex];
};

// definiere root
const root = {
    x: 500,
    y: 500,
    oben: null,
    rechtsoben: null,
    rechtsunten: null,
    unten: null,
    linksunten: null,
    linksoben: null
};
console.log(`created root: ${root.x}, ${root.y}`);
drawSingleHexagon(root.x, root.y);

function createHexagon(x, y, references = {}) {
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

const nextX = function(hexagon, direction) {
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

const nextY = function(hexagon, direction) {
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

let goDirection = Directions.rechtsunten;
let checkDirection = Directions.unten;
let pointer = root;

pointer.oben = createHexagon(nextX(pointer, Directions.oben), nextY(pointer, Directions.oben), { unten: pointer });
console.log(`created oben: ${pointer.oben.x}, ${pointer.oben.y}`);
drawSingleHexagon(pointer.oben.x, pointer.oben.y);

const stopX = pointer.oben.x;
const stopY = pointer.oben.y;

const nextHexagon = function(current) {
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

    current[direction] = createHexagon(x, y, references);

    drawSingleHexagon(current[direction].x, current[direction].y);

    //nextHexagon(current[direction]);
}

nextHexagon(pointer.oben);






//
// root.oben = createHexagon(root.x, root.y - RADIUS * Math.sqrt(3), { unten: root });
// root.unten = createHexagon(root.x, root.y + RADIUS * Math.sqrt(3), { oben: root });
// root.rechtsoben = createHexagon(root.x + 1.5 * RADIUS, root.y + 0.5 * RADIUS * Math.sqrt(3), { linksunten: root });
// root.rechtunten = createHexagon(root.x + 1.5 * RADIUS, root.y - 0.5 * RADIUS * Math.sqrt(3), { linksunten: root });
// root.linksoben = createHexagon(root.x - 1.5 * RADIUS, root.y + 0.5 * RADIUS * Math.sqrt(3), { linksunten: root });
// root.linksunten = createHexagon(root.x - 1.5 * RADIUS, root.y - 0.5 * RADIUS * Math.sqrt(3), { linksunten: root });




function drawSingleHexagon(x, y) {
    ctx.beginPath();
    for (let angle = 0; angle < 360; angle += 60) {
        let posX = x + RADIUS * Math.cos(Math.PI * angle / 180);
        let posY = y + RADIUS * Math.sin(Math.PI * angle / 180);

        if (angle === 0) {
            ctx.moveTo(posX, posY);
        } else {
            ctx.lineTo(posX, posY);
        }
    }
    ctx.closePath();
    ctx.stroke();
}

// let drawnHexagons = [];
//
// function drawAllHexagons(hex) {
//     if (!hex || drawnHexagons.includes(hex)) return;
//
//     drawSingleHexagon(hex.x, hex.y);
//     drawnHexagons.push(hex);
//
//     for (let direction in hex) {
//         if (hex[direction] && typeof hex[direction] === "object") {
//             drawAllHexagons(hex[direction]);
//         }
//     }
// }
//
// drawAllHexagons(root);




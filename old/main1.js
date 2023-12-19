const RADIUS = 20;

let root = {
    x: 500,
    y: 500,
    oben: null,
    rechtsoben: null,
    rechtsunten: null,
    unten: null,
    linksunten: null,
    linksoben: null
};

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

// root.oben = createHexagon(root.x, root.y - 1.5 * RADIUS, { unten: root });
// root.unten = createHexagon(root.x, root.y + 1.5 * RADIUS, { oben: root });
// root.rechtsoben = createHexagon(root.x + RADIUS * Math.sqrt(3), root.y, { linksunten: root });
// root.rechtsunten = createHexagon(root.x + RADIUS * Math.sqrt(3), root.y + 1.5 * RADIUS, { linksoben: root });
// root.linksoben = createHexagon(root.x - RADIUS * Math.sqrt(3), root.y, { rechtsunten: root });
// root.linksunten = createHexagon(root.x - RADIUS * Math.sqrt(3), root.y + 1.5 * RADIUS, { rechtsoben: root });

root.oben = createHexagon(root.x, root.y - RADIUS * Math.sqrt(3), { unten: root });
root.unten = createHexagon(root.x, root.y + RADIUS * Math.sqrt(3), { oben: root });
root.rechtsoben = createHexagon(root.x + 1.5 * RADIUS, root.y + 0.5 * RADIUS * Math.sqrt(3), { linksunten: root });
root.rechtunten = createHexagon(root.x + 1.5 * RADIUS, root.y - 0.5 * RADIUS * Math.sqrt(3), { linksunten: root });
root.linksoben = createHexagon(root.x - 1.5 * RADIUS, root.y + 0.5 * RADIUS * Math.sqrt(3), { linksunten: root });
root.linksunten = createHexagon(root.x - 1.5 * RADIUS, root.y - 0.5 * RADIUS * Math.sqrt(3), { linksunten: root });

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

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

let drawnHexagons = [];

function drawAllHexagons(hex) {
    if (!hex || drawnHexagons.includes(hex)) return;

    drawSingleHexagon(hex.x, hex.y);
    drawnHexagons.push(hex);

    for (let direction in hex) {
        if (hex[direction] && typeof hex[direction] === "object") {
            drawAllHexagons(hex[direction]);
        }
    }
}

drawAllHexagons(root);

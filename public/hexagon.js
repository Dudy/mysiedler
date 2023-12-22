import {RADIUS, HEIGHT, WIDTH} from "./config.js";

export const HEXAGON_WIDTH = 1.5 * RADIUS;
export const HEXAGON_HEIGHT = Math.sqrt(3) * RADIUS;
const VERTICAL_OFFSET = HEXAGON_HEIGHT * 0.5;

const SQUARE_RADIUS = RADIUS * RADIUS;
const FIELD_WIDTH = HEXAGON_WIDTH * WIDTH;
const FIELD_HEIGHT = HEXAGON_HEIGHT * HEIGHT;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Hexagon {

    constructor(column, row, id, color = 'black') {
        this.column = column;
        this.row = row;
        this.id = id;

        const x = column * HEXAGON_WIDTH;
        const y = row * HEXAGON_HEIGHT + (x / HEXAGON_WIDTH % 2) * VERTICAL_OFFSET;

        this.x = x;
        this.y = y;
        this.color = getRandomColor();

        this.top = undefined;
        this.topRight = undefined;
        this.bottomRight = undefined;
        this.bottom = undefined;
        this.bottomLeft = undefined;
        this.topLeft = undefined;
    }

    draw(context, offsetX = 0, offsetY = 0) {
        const numberOfSides = 6;
        const angle = (2 * Math.PI) / numberOfSides;

        context.beginPath();
        context.moveTo(offsetX + this.x + RADIUS * Math.cos(0), offsetY + this.y + RADIUS * Math.sin(0));

        for (let i = 1; i <= numberOfSides; i += 1) {
            context.lineTo(offsetX + this.x + RADIUS * Math.cos(i * angle), offsetY + this.y + RADIUS * Math.sin(i * angle));
        }

        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
        context.stroke();

        context.beginPath();
        context.font = "10px Arial";
        context.fillStyle = "black";
        context.fillText(`(${this.column},${this.row})`, offsetX + this.x - 10, offsetY + this.y + 4);
        context.closePath();

        // context.beginPath();
        // context.arc(offsetX + this.x, offsetY + this.y, RADIUS, 0, 2 * Math.PI, false);
        // context.lineWidth = 1;
        // context.stroke();
    }

    setNeighbors(top, topRight, bottomRight, bottom, bottomLeft, topLeft) {
        this.top = top;
        this.topRight = topRight;
        this.bottomRight = bottomRight;
        this.bottom = bottom;
        this.bottomLeft = bottomLeft;
        this.topLeft = topLeft;
    }

    isPointInside(x, y) {
        // im regulären Feld
        let dx = x - this.x;
        let dy = y - this.y;
        if (dx * dx + dy * dy <= SQUARE_RADIUS) {
            return {isInside: true, distance: dx * dx + dy * dy};
        }

        // irgendwo drumherum in den acht Spiegelungen des irregulären Feldes
        dx = ((x + FIELD_WIDTH) % FIELD_WIDTH) - this.x;
        dy = ((y + FIELD_HEIGHT) % FIELD_HEIGHT) - this.y;
        if (dx * dx + dy * dy <= SQUARE_RADIUS) {
            return {isInside: true, distance: dx * dx + dy * dy};
        }

        return {isInside: false, distance: Number.MAX_VALUE};
    }

    // source: https://stackoverflow.com/questions/5193331/is-a-point-inside-regular-hexagon
    // isIsideHexagon(float x, float y) {
    //     // Check length (squared) against inner and outer radius
    //     float l2 = x * x + y * y;
    //     if (l2 > 1.0f) return false;
    //     if (l2 < 0.75f) return true; // (sqrt(3)/2)^2 = 3/4
    //
    //     // Check against borders
    //     float px = x * 1.15470053838f; // 2/sqrt(3)
    //     if (px > 1.0f || px < -1.0f) return false;
    //
    //     float py = 0.5f * px + y;
    //     if (py > 1.0f || py < -1.0f) return false;
    //
    //     if (px - py > 1.0f || px - py < -1.0f) return false;
    //
    //     return true;
    // }
}

export default Hexagon;

import {RADIUS, HEIGHT, WIDTH} from "./config.js";

export const HEXAGON_WIDTH = 1.5 * RADIUS;
export const HEXAGON_HEIGHT = Math.sqrt(3) * RADIUS;
const VERTICAL_OFFSET = HEXAGON_HEIGHT * 0.5;

const HALF_RADIUS = RADIUS * 0.5;
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

    constructor(column, row, color = 'black') {
        this.column = column;
        this.row = row;

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
        if (x < 0 - HALF_RADIUS) {
            x += FIELD_WIDTH;
        }
        if (x > FIELD_WIDTH + HALF_RADIUS) {
            x -= FIELD_WIDTH;
        }

        if (y < 0 - HALF_RADIUS) {
            y += FIELD_HEIGHT;
        }
        if (y > FIELD_HEIGHT + HALF_RADIUS) {
            y -= FIELD_HEIGHT;
        }

        const dx = x - this.x;
        const dy = y - this.y;
        return dx * dx + dy * dy <= RADIUS * RADIUS;
    }
}

export default Hexagon;

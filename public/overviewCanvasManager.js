import {data, resourceColor} from "./config.js";
import {HEXAGON_WIDTH} from "./hexagon.js";

class OverviewCanvasManager {
    constructor(canvasId, hexagons) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.hexagons = hexagons;
        this.xOffset = 1;
        this.yOffset = 1;
        this.draw();

        window.addEventListener('offsetUpdatedEvent', this.eventHandler.bind(this));
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        for (let i = 0; i < this.hexagons.length; i++) {
            for (let j = 0; j < this.hexagons[i].length; j++) {
                if (i === data.hauptquartier.row && j === data.hauptquartier.column) {
                    this.context.fillStyle = 'yellow';
                } else {
                    this.context.fillStyle = resourceColor[this.hexagons[i][j].resource];
                }
                this.context.fillRect(j, i, 1, 1);
            }
        }

        this.context.strokeStyle = 'black';
        const x = 100 * (1 - this.xOffset);
        const y = 100 * (1 - this.yOffset);
        if (y < 80) {
            if (x < 80) {
                this.context.strokeRect(x, y, 20, 20);
            } else {
                this.context.strokeRect(x, y, 100 - x, 20);
                this.context.strokeRect(0, y, x - 80, 20);
            }
        } else {
            if (x < 80) {
                this.context.strokeRect(x, y, 20, 100 - y);
                this.context.strokeRect(x, 0, 20, y - 80);
            } else {
                this.context.strokeRect(0, 0, x - 80, y - 80);
                this.context.strokeRect(x, 0, 100 - x, y - 80);
                this.context.strokeRect(0, y, x - 80, 100 - y);
                this.context.strokeRect(x, y, 100 - x, 100 - y);
            }
        }
    }

    redraw() {
        this.clear();
        this.draw();
    }

    getClickedHexagon(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const xClick = clientX - rect.left - this.xOffset;
        const yClick = clientY - rect.top - this.yOffset;
        const foundCandiates = [];
        const distances = [];

        for (let row = 0; row < HEIGHT; row++) {
            for (let col = 0; col < WIDTH; col++) {
                const hex = this.hexagons[row][col];
                const {isInside, distance} = hex.isPointInside(xClick, yClick);
                if (isInside) {
                    foundCandiates.push(hex);
                    distances.push(distance);
                }
            }
        }

        if (foundCandiates.length > 0) {
            let closestCandidate = foundCandiates[0];
            let closestDistance = distances[0];
            for (let i = 1; i < foundCandiates.length; i++) {
                if (distances[i] < closestDistance) {
                    closestCandidate = foundCandiates[i];
                    closestDistance = distances[i];
                }
            }
            return closestCandidate;
        }

        return null;
    }

    clickHandler(e) {
        const clickedHexagon = this.getClickedHexagon(e.clientX, e.clientY);
        if (clickedHexagon) {
            // TODO
        }
    }

    eventHandler(e) {
        this.xOffset = e.detail.xOffset;
        this.yOffset = e.detail.yOffset;
        this.redraw();
    }
}

export default OverviewCanvasManager;

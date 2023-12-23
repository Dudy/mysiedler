import {resourceColor} from "./config.js";

class OverviewCanvasManager {
    constructor(canvasId, hexagons) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.hexagons = hexagons;
        this.draw();
        this.xOffset = 0;
        this.yOffset = 0;

        window.addEventListener('offsetUpdatedEvent', this.eventHandler.bind(this));
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        for (let i = 0; i < this.hexagons.length; i++) {
            for (let j = 0; j < this.hexagons[i].length; j++) {
                this.context.fillStyle = resourceColor[this.hexagons[i][j].resource];
                this.context.fillRect(j, i, 1, 1);
            }
        }
        this.context.strokeStyle = 'black';
        this.context.strokeRect(100 - this.xOffset, 100 - this.yOffset, 20, 20);
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
        console.log(`OverviewCanvasManager.eventHandler: ${JSON.stringify(e.detail)}`);
        this.xOffset = e.detail.xOffset;
        this.yOffset = e.detail.yOffset;
        this.redraw();
    }
}

export default OverviewCanvasManager;

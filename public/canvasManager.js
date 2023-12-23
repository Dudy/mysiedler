import {HEXAGON_HEIGHT, HEXAGON_WIDTH} from "./hexagon.js";
import {HEIGHT, RADIUS, resourceColor, WIDTH} from "./config.js";

const FIELD_WIDTH = HEXAGON_WIDTH * WIDTH;
const FIELD_HEIGHT = HEXAGON_HEIGHT * HEIGHT;
const HALF_RADIUS = RADIUS * 0.5;

class CanvasManager {
    constructor(canvasId, hexagons) {
        this.xOffset = 0;
        this.yOffset = 0;
        this.keyPressCount = {
            'w': 0,
            'a': 0,
            's': 0,
            'd': 0
        };
        this.keyHeld = {
            'w': false,
            'a': false,
            's': false,
            'd': false
        }

        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.hexagons = hexagons;
        this.canvas.addEventListener('click', this.clickHandler.bind(this));
        document.addEventListener('keydown', this.keyDownHandler.bind(this));
        document.addEventListener('keyup', this.keyUpHandler.bind(this));
        this.updateOffsets();
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(customXOffset = 0, customYOffset = 0) {
        const fullXOffset = customXOffset + this.xOffset;
        const fullYOffset = customYOffset + this.yOffset;
        this.hexagons
            .flat()
            .forEach(hexagon => {
                const x = fullXOffset + hexagon.x;
                const y = fullYOffset + hexagon.y;
                if (x + HEXAGON_WIDTH >= 0 && x <= this.canvas.width + HEXAGON_WIDTH &&
                    y + HEXAGON_HEIGHT >= 0 && y <= this.canvas.height + HEXAGON_HEIGHT) {
                    hexagon.draw(this.context, customXOffset + this.xOffset, customYOffset + this.yOffset);
                }
            });
    }

    redraw() {
        this.clear();
        this.draw(0, 0); // center
        this.draw(0, 0 - HEXAGON_HEIGHT * HEIGHT); // top
        this.draw(HEXAGON_WIDTH * WIDTH, 0 - HEXAGON_HEIGHT * HEIGHT); // top right
        this.draw(HEXAGON_WIDTH * WIDTH, 0); // right
        this.draw(HEXAGON_WIDTH * WIDTH, HEXAGON_HEIGHT * HEIGHT); // bottom right
        this.draw(0, HEXAGON_HEIGHT * HEIGHT); // bottom
        this.draw(0 - HEXAGON_WIDTH * WIDTH, HEXAGON_HEIGHT * HEIGHT); // bottom left
        this.draw(0 - HEXAGON_WIDTH * WIDTH, 0); // left
        this.draw(0 - HEXAGON_WIDTH * WIDTH, 0 - HEXAGON_HEIGHT * HEIGHT); // top left
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
            const colorDiv = document.getElementById('color');
            // colorDiv.style.backgroundColor = clickedHexagon.color;
            colorDiv.style.backgroundColor = resourceColor[clickedHexagon.resource];
        }
    }

    keyDownHandler(e) {
        if (['w', 'a', 's', 'd'].includes(e.key)) {
            this.keyHeld[e.key] = true;
        }
    }

    keyUpHandler(e) {
        if (['w', 'a', 's', 'd'].includes(e.key)) {
            this.keyHeld[e.key] = false;
            this.keyPressCount[e.key] = 0;
        }
    }

    updateOffsets() {
        Object.keys(this.keyHeld).forEach(key => {
            if (this.keyHeld[key]) {
                let increment = this.keyPressCount[key] > 50 ? 5 : Math.floor(1 + this.keyPressCount[key] / 10);
                this.keyPressCount[key]++;

                switch (key) {
                    case 'w':
                        this.yOffset += increment;
                        break;
                    case 'a':
                        this.xOffset += increment;
                        break;
                    case 's':
                        this.yOffset -= increment;
                        break;
                    case 'd':
                        this.xOffset -= increment;
                        break;
                }

                if (this.xOffset < 0) {
                    this.xOffset += HEXAGON_WIDTH * WIDTH;
                }
                if (this.xOffset > HEXAGON_WIDTH * WIDTH) {
                    this.xOffset -= HEXAGON_WIDTH * WIDTH;
                }
                if (this.yOffset < 0) {
                    this.yOffset += HEXAGON_HEIGHT * HEIGHT;
                }
                if (this.yOffset > HEXAGON_HEIGHT * HEIGHT) {
                    this.yOffset -= HEXAGON_HEIGHT * HEIGHT;
                }

                let meinEvent = new CustomEvent('offsetUpdatedEvent', {
                    detail: {
                        xOffset: this.xOffset / (HEXAGON_WIDTH * WIDTH),
                        yOffset: this.yOffset / (HEXAGON_HEIGHT * HEIGHT),
                        message: 'Hallo Welt!'
                    }
                });
                window.dispatchEvent(meinEvent);
            }
        });

        this.redraw();
        requestAnimationFrame(this.updateOffsets.bind(this));
    }
}

export default CanvasManager;

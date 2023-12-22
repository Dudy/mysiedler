export const WIDTH = 4;
export const HEIGHT = 4;

class CanvasManager {
    constructor(canvasId, hexagons) {
        this.xOffset = 200;
        this.yOffset = 200;
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
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.hexagons.flat().forEach(hexagon => hexagon.draw(this.context, this.xOffset, this.yOffset));
    }

    redraw() {
        this.clear();
        this.draw();
    }

    getClickedHexagon(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const xClick = clientX - rect.left - this.xOffset;
        const yClick = clientY - rect.top - this.yOffset;

        for (let row = 0; row < HEIGHT; row++) {
            for (let col = 0; col < WIDTH; col++) {
                const hex = this.hexagons[row][col];
                if (hex.isPointInside(xClick, yClick)) {
                    return hex;
                }
            }
        }
        return null;
    }

    clickHandler(e) {
        const clickedHexagon = this.getClickedHexagon(e.clientX, e.clientY);
        if (clickedHexagon) {
            const colorDiv = document.getElementById('color');
            colorDiv.style.backgroundColor = clickedHexagon.color;
        }
    }

    keyDownHandler(e) {
        if (['w', 'a', 's', 'd'].includes(e.key)) {
            this.keyHeld[e.key] = true;
            let increment = this.keyPressCount[e.key] > 50 ? 5 : Math.floor(1 + this.keyPressCount[e.key] / 10);
            this.keyPressCount[e.key]++;

            switch (e.key) {
                case 'w':
                    this.yOffset -= increment;
                    break;
                case 'a':
                    this.xOffset -= increment;
                    break;
                case 's':
                    this.yOffset += increment;
                    break;
                case 'd':
                    this.xOffset += increment;
                    break;
            }

            this.redraw();
        }
    }

    keyUpHandler(e) {
        if (['w', 'a', 's', 'd'].includes(e.key)) {
            this.keyHeld[e.key] = false;
            this.keyPressCount[e.key] = 0;
        }
    }
}

export default CanvasManager;

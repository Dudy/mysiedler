export const WIDTH = 4;
export const HEIGHT = 4;

let xOffset = 200;
let yOffset = 200;

class CanvasManager {
    constructor(canvasId, hexagons) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.hexagons = hexagons;
        this.canvas.addEventListener('click', this.clickHandler.bind(this));
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.hexagons.flat().forEach(hexagon => hexagon.draw(this.context, xOffset, yOffset));
    }

    getClickedHexagon(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const xClick = clientX - rect.left - xOffset;
        const yClick = clientY - rect.top - yOffset;

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
}

export default CanvasManager;

import Directions from './directions.js';

class Hexagon {
    static get RADIUS() {
        return 20;
    }

    static get X_VERSATZ() {
        return 1.5 * Hexagon.RADIUS;
    }

    static get Y_VERSATZ() {
        return 0.5 * Hexagon.RADIUS * Math.sqrt(3);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.oben = null;
        this.rechtsoben = null;
        this.rechtsunten = null;
        this.unten = null;
        this.linksunten = null;
        this.linksoben = null;
    }

    isVisible(rootOffsetX, xOffset, rootOffsetY, yOffset) {
        let posX = rootOffsetX + xOffset + this.x * Hexagon.X_VERSATZ + Hexagon.RADIUS;
        let posY = rootOffsetY + yOffset + this.y * Hexagon.Y_VERSATZ + Hexagon.RADIUS;

        const visibleX = posX >= 0 && posX <= 500 + Hexagon.X_VERSATZ;
        const visibleY = posY >= 0 && posY <= 500 + 3 * Hexagon.Y_VERSATZ;

        if (!visibleX || !visibleY) {
            console.log(`posX: ${posX}, posY: ${posY}`);
        }
        console.log(`posX: ${posX}, posY: ${posY}`);

        return visibleX && visibleY;
    }

    getNeighbour(direction) {
        switch (direction) {
            case Directions.oben:
                return this.oben;
            case Directions.rechtsoben:
                return this.rechtsoben;
            case Directions.rechtsunten:
                return this.rechtsunten;
            case Directions.unten:
                return this.unten;
            case Directions.linksunten:
                return this.linksunten;
            case Directions.linksoben:
                return this.linksoben;
            default:
                return null;
        }
    }
}

export default Hexagon;

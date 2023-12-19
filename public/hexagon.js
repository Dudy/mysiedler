class Hexagon {
    constructor(x, y, size, color = 'black') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    // draw(context) {
    //     const numberOfSides = 6;
    //     const angle = (2 * Math.PI) / numberOfSides;
    //
    //     context.beginPath();
    //     context.moveTo(this.x + this.size * Math.cos(0), this.y + this.size * Math.sin(0));
    //
    //     for (let i = 1; i <= numberOfSides; i += 1) {
    //         context.lineTo(this.x + this.size * Math.cos(i * angle), this.y + this.size * Math.sin(i * angle));
    //     }
    //
    //     context.strokeStyle = this.color;
    //     context.lineWidth = 1;
    //     context.stroke();
    // }

    draw(context, offsetX = 0, offsetY = 0) {
        const numberOfSides = 6;
        const angle = (2 * Math.PI) / numberOfSides;

        context.beginPath();
        context.moveTo(offsetX + this.x + this.size * Math.cos(0), offsetY + this.y + this.size * Math.sin(0));

        for (let i = 1; i <= numberOfSides; i += 1) {
            context.lineTo(offsetX + this.x + this.size * Math.cos(i * angle), offsetY + this.y + this.size * Math.sin(i * angle));
        }

        context.strokeStyle = this.color;
        context.lineWidth = 1;
        context.stroke();
    }
}

export default Hexagon;




// import Directions from './directions.js';
//
// class Hexagon {
//     static get RADIUS() {
//         return 20;
//     }
//
//     static get X_VERSATZ() {
//         return 1.5 * Hexagon.RADIUS;
//     }
//
//     static get Y_VERSATZ() {
//         return 0.5 * Hexagon.RADIUS * Math.sqrt(3);
//     }
//
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.top = null;
//         this.topright = null;
//         this.bottomright = null;
//         this.bottom = null;
//         this.bottomleft = null;
//         this.topleft = null;
//     }
//
//     isVisible(rootOffsetX, xOffset, rootOffsetY, yOffset) {
//         let posX = rootOffsetX + xOffset + this.x * Hexagon.X_VERSATZ + Hexagon.RADIUS;
//         let posY = rootOffsetY + yOffset + this.y * Hexagon.Y_VERSATZ + Hexagon.RADIUS;
//
//         const visibleX = posX >= 0 && posX <= 500 + Hexagon.X_VERSATZ;
//         const visibleY = posY >= 0 && posY <= 500 + 3 * Hexagon.Y_VERSATZ;
//
//         if (!visibleX || !visibleY) {
//             console.log(`posX: ${posX}, posY: ${posY}`);
//         }
//         console.log(`posX: ${posX}, posY: ${posY}`);
//
//         return visibleX && visibleY;
//     }
//
//     getNeighbour(direction) {
//         switch (direction) {
//             case Directions.top:
//                 return this.top;
//             case Directions.topright:
//                 return this.topright;
//             case Directions.bottomright:
//                 return this.bottomright;
//             case Directions.bottom:
//                 return this.bottom;
//             case Directions.bottomleft:
//                 return this.bottomleft;
//             case Directions.topleft:
//                 return this.topleft;
//             default:
//                 return null;
//         }
//     }
// }
//
// export default Hexagon;

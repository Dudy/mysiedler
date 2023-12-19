// public/main1.js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const hexRadius = 50; // Radius des Hexagons
const hexWidth = Math.sqrt(3) * hexRadius; // Breite des Hexagons (Abstand zwischen zwei horizontalen Seiten)
const hexHeight = 2 * hexRadius; // Höhe des Hexagons

// Funktion zum Zeichnen eines einzelnen Hexagons
function drawHexagon(x, y) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i;
        const cornerX = x + hexWidth * Math.cos(angle);
        const cornerY = y + hexHeight * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(cornerX, cornerY);
        } else {
            ctx.lineTo(cornerX, cornerY);
        }
    }
    ctx.closePath();
    ctx.stroke();
}

function drawHexGrid(rows, cols) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const offsetX = col * (3 / 2 * hexWidth);
            const offsetY = (col % 2 === 0 ? 0 : hexHeight / 2) + row * (hexHeight * 0.75);
            drawHexagon(offsetX, offsetY);
        }
    }
}

// Anzahl der Reihen und Spalten anpassen, um das Gitter zu kontrollieren
const rows = 5;
const cols = 8;
drawHexGrid(rows, cols);

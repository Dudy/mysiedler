let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let square = {
    x: 50,
    y: 50,
    size: 50,
    speed: 2
};

document.addEventListener('keydown', function(event) {
    const STEP = 10;  // Wie viele Pixel das Quadrat mit jedem Tastendruck bewegt wird

    if(event.key === 'w' || event.key === 'W') {
        square.y -= STEP;  // Bewegt das Quadrat nach oben

        // Optional: Stellen Sie sicher, dass das Quadrat nicht über den oberen Rand des Canvas hinausgeht
        if (square.y < 0) {
            square.y = 0;
        }
    } else if(event.key === 's' || event.key === 'S') {
        square.y += STEP;  // Bewegt das Quadrat nach unten

        // Optional: Stellen Sie sicher, dass das Quadrat nicht über den unteren Rand des Canvas hinausgeht
        if (square.y > canvas.height - square.size) {
            square.y = canvas.height - square.size;
        }
    }
});


function draw() {
    // Löschen Sie den gesamten Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Zeichnen Sie das Quadrat
    ctx.fillStyle = 'blue';
    ctx.fillRect(square.x, square.y, square.size, square.size);

    // Verändern Sie die Position des Quadrats
    square.x += square.speed;

    // Wenn das Quadrat den Rand des Canvas erreicht, invertieren Sie die Richtung
    if(square.x > canvas.width - square.size || square.x < 0) {
        square.speed = -square.speed;
    }

    // Verwenden Sie requestAnimationFrame für den Animationsloop
    requestAnimationFrame(draw);
}

// Starten Sie den Animationsloop
draw();

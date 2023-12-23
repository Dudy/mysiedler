export class SeedableRandom {
//class SeedableRandom {
    constructor(seed) {
        this.seed = seed;
    }

    random() {
        // Konstanten für die lineare Kongruenzmethode
        const a = 1664525;
        const c = 1013904223;
        const m = 2 ** 32;

        // Aktualisieren des Seeds und Zurückgeben einer Zahl zwischen 0 und 1
        this.seed = (a * this.seed + c) % m;
        return this.seed / m;
    }

    randomInt(max) {
        return Math.floor(this.random() * max);
    }
}

function test() {
// Verwendung des seedbaren Zufallsgenerators
const rng = new SeedableRandom(12345); // Initialisieren mit einem Seed
//console.log(rng.random()); // Gibt eine Zufallszahl basierend auf dem Seed aus
//console.log(rng.random()); // Gibt eine andere Zufallszahl basierend auf dem aktualisierten Seed aus

const numberMap = new Map();
for (let i = 0; i < 100; i++) {
    const number = rng.randomInt(10);
    if (numberMap.has(number)) {
        numberMap.set(number, numberMap.get(number) + 1);
    } else {
        numberMap.set(number, 1);
    }
    console.log(number); // Gibt eine Zufallszahl zwischen 0 und 10 aus
}

console.log(numberMap); // Gibt eine Map mit den Zufallszahlen und deren Häufigkeit aus
}

//test();
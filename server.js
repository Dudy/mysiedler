// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // Du kannst den Port nach Bedarf ändern

// Statische Dateien aus dem "public" Ordner servieren
app.use(express.static(path.join(__dirname, 'public')));

// Starten des Servers
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

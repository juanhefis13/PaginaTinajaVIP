const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde la carpeta raíz 'Websites-proyect'
app.use(express.static(path.join(__dirname)));

// Ruta raíz (/) sirve el index.html de la carpeta Inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Inicio', 'index.html'));
});

// Manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
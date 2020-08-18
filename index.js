const express = require('express');
const cors = require('cors');

const app = express(); // Se crea el servidor
const PORT = process.env.PORT || 4000; // Puerto de la app

const items = require('./routes/items');
const item = require('./routes/item');

// Habilitar CORS
app.use(cors());

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

// Definir la pagina principal
app.get('/', (req, res) => {
  res.send('El servidor Express esta corriendo');
});

// Endpoint para productos
app.use('/api/items', items);

// Endpoint para detalle del producto
app.use('/api/items', item);

// Arrancar la app
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Puerto de servidor: ${PORT}`);
});
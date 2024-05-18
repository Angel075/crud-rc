const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send('Archivo no encontrado');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(data);
    }
  });
});

app.get('/:filename', (req, res) => {
  const filePath = path.join(__dirname, req.params.filename);
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send('Archivo no encontrado');
    } else {
      res.setHeader('Content-Type', contentType);
      res.status(200).send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor web iniciado en el puerto ${PORT}`);
});

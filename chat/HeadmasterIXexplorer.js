
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/files', (req, res) => {
  const dirPath = path.join(__dirname, 'explorer'); // vervang met jouw map
  fs.readdir(dirPath, (err, files) => {
    if (err) return res.status(500).send('Error reading directory');
    res.json(files);
  });
});

app.listen(3000, () => console.log('Mini-verkenner draait op http://localhost:1234'));

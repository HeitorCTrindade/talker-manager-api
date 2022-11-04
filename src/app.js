// gogo Iniciando o projetoclear

const express = require('express');

const app = express();

app.get('/talker', (req, res) => res.status(200).json({ message: 'olá Mundo!' }));

module.exports = app;
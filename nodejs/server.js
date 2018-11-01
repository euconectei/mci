const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

console.log(`http://localhost:${port}`);

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const configDB = require('./config/database.js');

mongoose.connect(configDB.url), { useNewUrlParser: true };

app.get('/', (req, res) => res.write(JSON.stringify({ nome: 'Rafael' })));
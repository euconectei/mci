const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const configDB = require('./config/database.js');

mongoose.connect(configDB.url,{
  useMongoClient: true
});
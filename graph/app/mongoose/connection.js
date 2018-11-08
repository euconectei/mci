const mongoose = require('mongoose');
const configDB = require('../config/database.js');
mongoose.connect(configDB.url, {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', (err) => console.log(`Erro: ${err}`));
db.on('open', () => console.log(`Conexão aberta`));
db.on('connected', () => console.log(`Conectado ao banco!`))
db.on('disconnected', () => console.log(`Desconectado do banco`));
const express = require('express');
const cors = require('cors');
const router = require('./routes/routes.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/",router); 

app.listen(8676, function () {
  console.log('Servidor rodando na porta 8676');
});
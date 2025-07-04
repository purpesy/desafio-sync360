const express = require('express');
const cors = require('cors');
const router = require('./routes/routes.js');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use("/",router); 

app.listen(8676, function () {
  console.log('Servidor rodando na porta 8676');
});
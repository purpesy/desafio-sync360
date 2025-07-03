import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('API de Perfil de Usuário');

});

app.listen(8676, function () {
  console.log('Servidor rodando na porta 8676');
});
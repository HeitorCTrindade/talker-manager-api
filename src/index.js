const express = require('express');
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');
const {
  getAllTalkers,
  getTalkersById,
} = require('./helpers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => res.status(200).json(await getAllTalkers()));

app.get('/talker/:id', async (req, res) => {  
  const talkerWanted = await getTalkersById(+req.params.id);
  if (!talkerWanted) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerWanted);
});

app.post('/login', async (req, res) => {  
  const { email, password } = req.body;
  console.log(CryptoJS.enc.Utf8.parse("password").toString());
  console.log(CryptoJS.enc.Utf8.parse("atrs").toString());
});

const express = require('express');
const bodyParser = require('body-parser');
const tokenGen = require('crypto');
const {
  getAllTalkers,
  getTalkersById,
  postTalkers,
  updateTalkersById,
  deleteTalkersById,
  getTalkersByTerm,
} = require('./helpers');

const validateLogin = require('./middlewares/validateLogin');
const { 
  validateTalkerPostAndPut,
  validateTalkerDelete,
  validateToken,
} = require('./middlewares/validateTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3022';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/search', validateTalkerDelete, async (req, res) => {
  const talkerWanted = await getTalkersByTerm(req.query.q);
  if (!talkerWanted) {
    return res.status(400).json({ message: talkerWanted });
  }  
  return res.status(200).json(talkerWanted);
});

app.get('/talker', async (_req, res) => res.status(200).json(await getAllTalkers()));

app.get('/talker/:id', async (req, res) => {  
  const talkerWanted = await getTalkersById(+req.params.id);
  if (!talkerWanted) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }  
  return res.status(200).json(talkerWanted);
});

app.post('/talker/', validateTalkerPostAndPut, async (req, res) => {  
  const talkeradd = await postTalkers(req.body);    
  return res.status(201).json(talkeradd);
});

app.put('/talker/:id', validateTalkerPostAndPut, async (req, res) => {  
  const talkerUpdated = await updateTalkersById(+req.params.id, req.body);
  return res.status(200).json(talkerUpdated);
});

app.delete('/talker/:id', validateTalkerDelete, async (req, res) => {  
  await deleteTalkersById(+req.params.id);  
  return res.status(204).send();
});

app.post('/login', validateLogin, (req, res) => {  
  const token = tokenGen.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

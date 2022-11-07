const CKECK_OK = null;

const validateToken = (token, res) => {
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });    

  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  return CKECK_OK;
};

const validateName = (name, res) => {
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });    

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  return CKECK_OK;
};

const validateAge = (age, res) => {
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });    

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  return CKECK_OK;
};

const validateDataFormat = (data) => {
  const splitData = data.split('/');
  
  if (splitData.length !== 3) return false;
  
  if (splitData[0].length !== 2) return false;

  if (splitData[1].length !== 2) return false;

  if (splitData[2].length !== 4) return false;

  return true;
};

const validateTalkRate = (rate, res) => {
    if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  if (rate < 1 || +rate > 5 || !Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return false;
};

const validateTalk = (talk, res) => {
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });    

  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!validateDataFormat(talk.watchedAt)) {        
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } 

  const va = validateTalkRate(talk.rate, res);
    if (va !== false) return va;   

  return CKECK_OK;
};

const validateTalkerPost = (req, res, next) => {
  const { name, age, talk } = req.body;
  const token = req.header('Authorization');
  
  const vt = validateToken(token, res);
  if (vt !== CKECK_OK) return vt;

  const vn = validateName(name, res);
  if (vn !== CKECK_OK) return vn;
  
  const va = validateAge(age, res);
  if (va !== CKECK_OK) return va;

  const vtalk = validateTalk(talk, res);
  if (vtalk !== CKECK_OK) return vtalk;

  next(); 
};

module.exports = validateTalkerPost;
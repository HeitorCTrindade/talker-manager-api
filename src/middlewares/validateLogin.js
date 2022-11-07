const verifyEmail = (email = '') => {  
  if (email.includes(`/\S+@\S+\.\S+/`)) {
    return true;
  }
  return false;
};

const validadeLogin = (req, res) => {
  const { email, password } = req.body;
  
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (verifyEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com' });
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.lenght < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  // next 
};

module.exports = validadeLogin;

// const isValidLogin = email !== undefined
  // && verifyEmail(email)
  //  && password !== undefined
  //  && password.lenght > 6;  
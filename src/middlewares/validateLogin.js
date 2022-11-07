const verifyEmail = (email = '') => String(email).toLowerCase().match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/);

const validadeLogin = (req, res, next) => {
  const { email, password } = req.body;    
 
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });    

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }  

  if (!verifyEmail(email)) {     
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }  
  next(); 
};

module.exports = validadeLogin;

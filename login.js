const express = require('express');
const token = require('./generateToken');

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const emailValidator = /\S+@\S+\.\S+/;
  const isValidEmail = emailValidator.test(email);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isValidEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token });
});

module.exports = router;

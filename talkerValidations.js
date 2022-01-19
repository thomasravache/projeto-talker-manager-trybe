const nameValidator = (req, res, next) => {
  const { name } = req.body;

  const emptyName = 'O campo "name" é obrigatório';
  const lengthLimit = 'O "name" deve ter pelo menos 3 caracteres';

  if (!name) return res.status(400).json({ message: emptyName });
  if (name.length < 3) return res.status(400).json({ message: lengthLimit });

  return next();
};

const ageValidator = (req, res, next) => {
  const { age } = req.body;

  const emptyAge = 'O campo "age" é obrigatório';
  const ageLimit = 'A pessoa palestrante deve ser maior de idade';

  if (!age) return res.status(400).json({ message: emptyAge });
  if (age < 18) return res.status(400).json({ message: ageLimit });

  return next();
};

const talkValidator = (req, res, next) => {
  const { watchedAt, rate } = req.body;
  const validation = [watchedAt, rate].some((field) => !field);
  const message = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (validation) return res.status(400).json({ message });

  return next();
};

const watchedAtValidator = (req, res, next) => {
  const { watchedAt } = req.body;
  const dateValidator = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const validation = dateValidator.test(watchedAt);
  const message = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

  if (!validation) return res.status(400).json({ message });

  return next();
};

const rateValidator = (req, res, next) => {
  const { rate } = req.body;
  const validation = (rate < 1 || rate > 5);
  const message = 'O campo "rate" deve ser um inteiro de 1 à 5';
  if (validation) return res.status(400).json({ message });

  return next();
};

module.exports = {
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
};

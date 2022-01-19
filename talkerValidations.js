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
  const { talk = {} } = req.body;
  const { watchedAt, rate } = talk;
  const validation = [watchedAt, rate].some((field) => field === undefined);
  const message = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (validation) return res.status(400).json({ message });

  return next();
};

const validateTalkProperties = (req, res, next) => {
  const { talk: { rate, watchedAt } } = req.body;

  const dateValidator = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const validationDate = dateValidator.test(watchedAt);
  const messageDate = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

  if (!validationDate) return res.status(400).json({ message: messageDate });

  const validationRate = (rate < 1 || rate > 5);
  const messageRate = 'O campo "rate" deve ser um inteiro de 1 à 5';

  if (validationRate) return res.status(400).json({ message: messageRate });

  return next();
};

module.exports = {
  nameValidator,
  ageValidator,
  talkValidator,
  validateTalkProperties,
};

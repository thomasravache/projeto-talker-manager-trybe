const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const authentication = require('./authentication');
const { nameValidator, ageValidator, talkValidator,
validateTalkProperties } = require('./talkerValidations');

const router = express.Router();

const readTalkerFile = async () => {
  const talkerFile = await fs.readFile(path.join(__dirname, 'talker.json'), 'utf-8');
  const talkers = await JSON.parse(talkerFile);

  return talkers;
};

const writeTalkerFile = async (content) => {
  await fs.writeFile(path.join(__dirname, 'talker.json'), JSON.stringify(content));
};

router.get('/', async (_req, res) => {
  const talkers = await readTalkerFile();

  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talkers = await readTalkerFile();
    const talker = talkers.find((t) => parseInt(t.id, 10) === parseInt(id, 10));

    if (!talker) throw new Error('Pessoa palestrante não encontrada');

    res.status(200).json(talker);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
});

router.use(authentication);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readTalkerFile();
    const talkerIndex = talkers.findIndex((talker) => parseInt(talker.id, 10) === parseInt(id, 10));
    
    if (talkerIndex === -1) throw new Error('Talker informado não existe');

    talkers.splice(talkerIndex, 1);
    await writeTalkerFile(talkers);

    return res.status(204).end();
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
});

router.use(nameValidator);
router.use(ageValidator);
router.use(talkValidator);
router.use(validateTalkProperties);

router.post('/', async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const talkers = await readTalkerFile();
    const maxId = talkers.map((t) => parseInt(t.id, 10)).reduce((a, b) => Math.max(a, b));
    const id = !maxId ? 1 : maxId + 1;

    talkers.push({ id, name, age, talk });
    const talker = talkers.find((t) => parseInt(t.id, 10) === id);

    await writeTalkerFile(talkers);

    return res.status(201).json(talker);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await readTalkerFile();
    const talkerIndex = talkers.findIndex((talker) => parseInt(talker.id, 10) === parseInt(id, 10));

    if (talkerIndex === -1) throw new Error('Talker não existe');

    talkers[talkerIndex] = { ...talkers[talkerIndex], age, name, talk };

    await writeTalkerFile(talkers);
  
    return res.status(200).json(talkers[talkerIndex]);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

module.exports = router;

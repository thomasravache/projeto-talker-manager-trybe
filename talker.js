const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const readTalkerFile = async () => {
  const talkerFile = await fs.readFile(path.join(__dirname, 'talker.json'), 'utf-8');
  const talkers = await JSON.parse(talkerFile);

  return talkers;
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

module.exports = router;

const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

router.get('/', async (req, res) => {
  const talkerFile = await fs.readFile('./talker.json', 'utf-8');
  const talkers = await JSON.parse(talkerFile);

  return res.status(200).json(talkers);
});

module.exports = router;

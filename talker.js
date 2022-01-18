const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkerFile = await fs.readFile(path.join(__dirname, 'talker.json'), 'utf-8');
  const talkers = await JSON.parse(talkerFile);

  return res.status(200).json(talkers);
});

module.exports = router;

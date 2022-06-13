const express = require('express');

const router = express.Router();

const { readFile } = require('../database');

router.get('/', async (_req, res) => {
  const data = await readFile('./talker.json');

  if (data.length === 0) {
    return res.status(200).json([]);
  }

  res.status(200).json(data);
});

module.exports = router;
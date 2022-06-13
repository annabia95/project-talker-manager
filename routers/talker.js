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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  const data = await readFile('./talker.json');

  const dataID = data.find((elem) => elem.id === +id);

  if (!dataID) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(dataID);
});

module.exports = router;
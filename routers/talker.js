const express = require('express');

const router = express.Router();

const { readFile, writeFile } = require('../database');

const middlewares = require('../middlewares');

router.use(middlewares.auth);
router.use(middlewares.nameValidation);
router.use(middlewares.ageValidation);
router.use(middlewares.talkValidation);
router.use(middlewares.watchedAtValidation);
router.use(middlewares.rateValidation);

router.get('/', async (_req, res) => {
  const data = await readFile('./talker.json');

  if (data.length === 0) {
    return res.status(200).json([]);
  }

  res.status(200).json(data);
});

router.post('/', async (req, res) => {
  const user = req.body;

  const data = await readFile('./talker.json');

  data.push(user);

  await writeFile('./talker.json', JSON.stringify(user));

  return res.status(201).end();
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
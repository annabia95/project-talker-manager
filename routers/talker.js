/* eslint-disable sonarjs/no-duplicate-string */
const express = require('express');

const router = express.Router();

const { readFile, writeFile } = require('../database');

const databaseUsers = require('../talker.json');

const middlewares = require('../middlewares');

router.get('/', async (_req, res) => {
  const data = await readFile('./talker.json');

  if (data.length === 0) {
    return res.status(200).json([]);
  }

  res.status(200).json(data);
});

router.post('/',
  middlewares.auth,
  middlewares.nameValidation,
  middlewares.ageValidation,  
  middlewares.talkValidation,
  middlewares.watchedAtValidation,
  middlewares.rateValidation,
  async (req, res) => {
  const user = req.body;

  const newUser = {
    id: databaseUsers.length + 1,
    ...user,
  };

  const data = await readFile('./talker.json');

  data.push(newUser);

  await writeFile('./talker.json', JSON.stringify(data));

  return res.status(201).json(newUser);
});

/* router.get('/search', middlewares.auth, async (req, res) => {
  const { q } = req.query;

  const data = await readFile('./talker.json');

  const userSearch = data.filter((u) => 
    u.name.toLowerCase().includes(q.toLowerCase()));

  if (!q) {
      return res.status(200).json(data);
  }
  if (!userSearch) {
    return res.status(200).json([]);
  }

  res.status(200).json(userSearch);
}); */

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  
  const data = await readFile('./talker.json');

  const dataID = data.find((elem) => elem.id === +id);

  if (!dataID) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(dataID);
  next();
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  const data = await readFile('./talker.json');

  const userIndex = data.findIndex((u) => u.id === +id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  data.splice(userIndex, 1);

  res.status(204).end();
});

module.exports = router;
const express = require('express');

const router = express.Router();

const { readFile, writeFile } = require('../database');

const databaseUsers = require('../talker.json');

const middlewares = require('../middlewares');

router.get('/', async (_req, res) => {
  const file = await readFile();
  const data = JSON.parse(file);

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

  const file = await readFile();
  const data = JSON.parse(file);

  data.push(newUser);

  await writeFile('./talker.json', JSON.stringify(data));

  return res.status(201).json(newUser);
});

router.get('/search', middlewares.auth, async (req, res) => {
  const { q } = req.query;

  const file = await readFile();
  const data = JSON.parse(file);

  const userSearch = data.filter((u) => 
    u.name.toLowerCase().includes(q.toLowerCase()));

  if (!q) {
      return res.status(200).json(data);
  }
  if (!userSearch) {
    return res.status(200).json([]);
  }

  res.status(200).json(userSearch);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  
  const file = await readFile();
  const data = JSON.parse(file);

  const dataID = data.find((elem) => elem.id === +id);

  if (!dataID) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(dataID);
  next();
});

router.put('/:id',
  middlewares.auth,
  middlewares.nameValidation,
  middlewares.ageValidation,  
  middlewares.talkValidation,
  middlewares.watchedAtValidation,
  middlewares.rateValidation,
  async (req, res) => {
  const file = await readFile();
  const data = JSON.parse(file);
  const { id } = req.params;
  const user = req.body;
  const updateUser = {
    id: Number(id),
    ...user,
  };
  const newUsersList = data.map((elem) => {
    if (updateUser.id === elem.id) return updateUser;
    return elem;
  });

  await writeFile('./talker.json', JSON.stringify(newUsersList));

  return res.status(200).json(updateUser);
});

router.delete('/:id', middlewares.auth, async (req, res) => {
  const { id } = req.params;
  
  const file = await readFile();
  const data = JSON.parse(file);

  const updateUsers = data.filter((talker) => talker.id !== Number(id));

  await writeFile('./talker.json', JSON.stringify(updateUsers));

  return res.status(204).end();
});

module.exports = router;
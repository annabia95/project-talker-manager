const loginValidation = require('./loginValidation');
const auth = require('./auth');
const nameValidation = require('./nameValidation');
const ageValidation = require('./ageValidation');
const talkValidation = require('./talkValidation');
const watchedAtValidation = require('./watchedAtValidation');
const rateValidation = require('./rateValidation');

module.exports = {
  loginValidation,
  auth,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
};
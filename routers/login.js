const express = require('express');

const router = express.Router();

const crypto = require('crypto');

const middlewares = require('../middlewares');

router.use(middlewares.loginValidation);

router.post('/', (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
});

module.exports = router;
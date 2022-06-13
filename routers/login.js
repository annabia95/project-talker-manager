const express = require('express');

const router = express.Router();

const crypto = require('crypto');

router.post('/', (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].includes(undefined)) {
      return res.status(401).json({ message: 'missing fields' });
    }

    const token = crypto.randomBytes(8).toString('hex');

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).end();
  }
});

module.exports = router;
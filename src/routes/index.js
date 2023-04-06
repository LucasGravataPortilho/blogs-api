const express = require('express');

const router = express.Router();

const loginRoute = require('./login.routes');

router.use('/login', loginRoute);

module.exports = router;
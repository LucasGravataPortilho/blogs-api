const express = require('express');

const router = express.Router();

const loginRoute = require('./login.routes');
const userRoute = require('./user.routes');

router.use('/login', loginRoute);
router.use('/user', userRoute);

module.exports = router;
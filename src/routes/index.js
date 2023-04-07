const express = require('express');

const router = express.Router();

const loginRoute = require('./login.routes');
const userRoute = require('./user.routes');
const categoryRoute = require('./category.routes');
const postRoute = require('./post.routes');

router.use('/login', loginRoute);
router.use('/user', userRoute);
router.use('/categories', categoryRoute);
router.use('/post', postRoute);

module.exports = router;
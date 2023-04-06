const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');

router.route('/')
    .post(validateUser, userController.createUser);

module.exports = router;
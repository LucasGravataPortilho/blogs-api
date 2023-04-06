const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');
const validateJWT = require('../middlewares/validateJWT');

router.route('/')
    .post(validateUser, userController.createUser)
    .get(validateJWT, userController.getAll);

module.exports = router;
const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/category.controller');
const validateJWT = require('../middlewares/validateJWT');

router.route('/')
    .post(validateJWT, categoryController.createCategory)
    .get(validateJWT, categoryController.getAll);

module.exports = router;
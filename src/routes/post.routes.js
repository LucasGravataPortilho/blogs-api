const express = require('express');

const router = express.Router();

const postController = require('../controllers/post.controller');
const validateJWT = require('../middlewares/validateJWT');

router.route('/')
    .post(validateJWT, postController.createPost)
    .get(validateJWT, postController.getAll);

router.route('/:id')
    .get(validateJWT, postController.getById)
    .put(validateJWT, postController.update);

module.exports = router;
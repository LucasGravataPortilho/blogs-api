const { BlogPost, User, Category } = require('../models');

const createPost = ({ title, content, categoryIds }) => BlogPost
    .create({ title, content, categoryIds });

const getPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    { model: Category, as: 'categories', attributes: ['id', 'name'] },
  ],
});

const getById = (id) => BlogPost.findByPk(id, {
  include: [
    { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    { model: Category, as: 'categories', attributes: ['id', 'name'] },
  ],
});

module.exports = {
  createPost,
  getPosts,
  getById,
};

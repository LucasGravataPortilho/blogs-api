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

const updatePosts = async (id, { title, content }) => {
  const updatePost = await getById(id);

  updatePost.title = title;
  updatePost.content = content;
  updatePost.updated = new Date();
  const updatedPost = await updatePost.save();
  
  return updatedPost;
};

const deletePost = (id) => BlogPost.destroy({ where: { id } });

module.exports = {
  createPost,
  getPosts,
  getById,
  updatePosts,
  deletePost,
};

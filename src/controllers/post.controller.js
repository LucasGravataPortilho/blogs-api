const { BlogPostService } = require('../services');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const bodyValid = title && content && categoryIds;
  
    if (!bodyValid) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
  
    const post = await BlogPostService.createPost({ title, content, categoryIds });
  
    res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const posts = await BlogPostService.getPosts();
  
    return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  createPost,
  getAll,
};

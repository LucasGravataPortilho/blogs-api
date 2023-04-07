const { BlogPostService } = require('../services');

const INTERNAL_ERROR = 'Erro interno';

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
    return res.status(500).json({ message: INTERNAL_ERROR, error: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const posts = await BlogPostService.getPosts();
  
    return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json({ message: INTERNAL_ERROR, error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPostService.getById(id);
  
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
  
    return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json({ message: INTERNAL_ERROR, error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { user } = req;
    const bodyValid = title && content;
  
    if (!bodyValid) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const post = await BlogPostService.getById(id);

    if (post.userId !== user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const updatedPost = await BlogPostService.updatePosts(id, { title, content });
    
    return res.status(200).json(updatedPost);
    } catch (err) {
      return res.status(500).json({ message: INTERNAL_ERROR, error: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const post = await BlogPostService.getById(id);
    console.log(post);

    if (post.userId !== user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    if (!post) {
        return res.status(404).json({ message: 'Post does not exist' });
    }

    await BlogPostService.deletePost(id);
    
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: INTERNAL_ERROR, error: err.message });
  }
};

module.exports = {
  createPost,
  getAll,
  getById,
  update,
  destroy,
};

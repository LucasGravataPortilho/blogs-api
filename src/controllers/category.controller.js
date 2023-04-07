const { CategoryService } = require('../services');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }

    const category = await CategoryService.createCategory({ name });

    res.status(201).json(category);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getAll = async (req, res) => {
    try {
      const users = await CategoryService.getCategories();
  
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: 'Erro interno', error: err.message });
    }
  };

module.exports = {
  createCategory,
  getAll,
};
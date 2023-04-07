const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const getAll = async (req, res) => {
  try {
    const users = await UserService.getUsers();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getByUserId(id);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const userExists = await UserService.getByEmail(email);

    if (userExists) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const user = await UserService.createUser({ displayName, email, password, image });

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

    res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
    createUser,
    getAll,
    getById,
};

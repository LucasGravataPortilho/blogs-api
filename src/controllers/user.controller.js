const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

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
};

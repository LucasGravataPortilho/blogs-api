const validateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const textEmail = /\S+@\S+\.\S+/;
  const limit = 8;
  const passLimit = 6;

  if (displayName.length < limit) {
    return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!textEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (password.length < passLimit) {
    return res.status(400)
        .json({ message: '"password" length must be at least 6 characters long' });
  }

  next();
};

module.exports = validateUser;
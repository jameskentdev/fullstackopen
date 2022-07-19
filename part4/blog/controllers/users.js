const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, response, _next) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Password must be atleast 3 characters' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: 'Username already in use' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (exception) {
    if (exception.name === 'ValidationError') {
      // Intercept ValidationError for more verbose output
      return response
        .status(400)
        .json({ error: 'Username must be atleast 3 characters' });
    }
  }
});

usersRouter.get('/', async (request, response, _next) => {
  const users = await User.find({});

  response.status(200).json(users);
});

module.exports = usersRouter;

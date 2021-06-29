const usersService = require('../services/user');

const OK = 200;
const CREATED = 201;

const validate = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    await usersService.validate(displayName, email, password);
    next();
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

const create = async (req, res) => {
  try {
    const token = await usersService.create(req.body);
    res.status(CREATED).json({ token });
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

const validateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await usersService.validateLogin(email, password);
    next();
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

const login = async (req, res) => {
  try {
    const token = await usersService.login(req.body.email);
    res.status(OK).json({ token });
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

module.exports = {
  validate,
  create,
  validateLogin,
  login,
};

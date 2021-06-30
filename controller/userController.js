const user = require('../services/user');

const OK = 201;
const SUCCESS = 200;

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await user.validUser(displayName, email, password, image);
    return res.status(OK).json(newUser);
  } catch (e) {
    if (e.message === 'User already registered') {
      return res.status(409).json({
        message: e.message,
      });
    }
    return res.status(400).json({
      message: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await user.login(email, password);
    return res.status(SUCCESS).json({ token: userLogin });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

module.exports = { 
  createUser,
  login,
};
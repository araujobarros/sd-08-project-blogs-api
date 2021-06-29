const rescue = require('express-rescue');
const helpers = require('../../helpers/helpers');

const {
  createServices,
  loginServices,
  findServices,
  findIdServices,
} = require('../../sevices/user/user');

const createUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const token = await createServices({ displayName, email, password, image });
  if (token.status) return next(token);
  res.status(helpers.DOU).json({ token });
});

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const token = await loginServices({ email, password });
  if (token.status) return next(token);
  res.status(helpers.DOO).json({ token });
});

const findUser = rescue(async (_req, res) => {
  const result = await findServices();
  res.status(helpers.DOO).json(result);
});

const findIdUser = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await findIdServices(id);
  if (result.status) return next(result);
  res.status(helpers.DOO).json(result);
});

module.exports = {
  createUser,
  loginUser,
  findUser,
  findIdUser,
};

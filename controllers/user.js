const rescue = require('express-rescue');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { sequelize } = require('../models');

const create = rescue(async (req, res, next) => {
    const { error } = joi.object({
        displayName: joi.string().min(8),
        email: joi.string().email().required(),
        password: joi.string().min(6)
        .message('{#label} length must be 6 characters long').required(),
        image: joi.string(),
    })
        .validate(req.body);

    if (error) return next(error);

    const { displayName, email, password, image } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) return next({ message: 'User already registered', code: 409 });

    const user = await sequelize.transaction(async (transaction) => (
        User.create({ displayName, email, password, image }, { transaction })));

    const token = jwt.sign(user.dataValues, process.env.JWT_SECRET);

    res.status(201).json({ token });
});

module.exports = {
    create,
};
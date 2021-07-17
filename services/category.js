const { sequelize } = require('../models');
const { Categories: CategoryModel } = require('../models');
const { CategorySchema } = require('../schema');
const { customError } = require('../utils/index');

const createOne = async (newCategory) => {
  const { error } = CategorySchema.validate(newCategory);

  if (error) return customError(error.details[0].message, 'invalidData');

  const category = await CategoryModel.findOne({
    where: { name: newCategory.name },
  });

  if (category) return customError('Category already registered', 'conflict');

  return sequelize.transaction(async (transaction) =>
    CategoryModel.create({ ...newCategory }, { transaction }));
};

const findAll = async (options) => CategoryModel.findAll(options);

module.exports = {
  createOne,
  findAll,
};
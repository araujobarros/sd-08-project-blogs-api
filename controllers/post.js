const PostSevices = require('../services/post');

const add = async (req, res) => {
  const { body, user } = req;
  const response = await PostSevices.add(body, user);

  res.status(201).json(response);
};

const getAll = async (req, res) => {
  const response = await PostSevices.getAll();
  res.status(200).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await PostSevices.getById(id);
  res.status(200).json(response);
};

const updateById = async (req, res) => {
  const { id: postId } = req.params;
  const { body: newPostData, user } = req;
  const response = await PostSevices.updateById(postId, newPostData, user.id);
  res.status(200).json(response);
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
};
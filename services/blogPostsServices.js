const { BlogPost, User, Category } = require('../models');
const { status, message } = require('../schema/status');

const createBlogPosts = async (body, user) => {
  const { id } = user;
  const createBlogPost = await BlogPost.create({
     userId: id,
     ...body,
     published: new Date(),
     updated: new Date(),
  });
  return createBlogPost;
};

const findAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  console.log(posts);
  return posts;
};

const findPostById = async (id) => {
  const findPost = await BlogPost.findOne({ where: { id } });
  if (!findPost) {
    return { isError: true, status: status.notFound, message: message.postNotExist };
  }
  const getPostById = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return getPostById;
};

module.exports = {
  createBlogPosts,
  findAllPosts,
  findPostById,
};
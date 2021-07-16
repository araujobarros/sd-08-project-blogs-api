const express = require('express');
const { BlogPost } = require('../models');
const { validatePosts, validateCategoryIds } = require('../schema');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user.data;
    const invalid = validatePosts(title, content, categoryIds);
    if (invalid) return res.status(invalid.status).json({ message: invalid.message });
    
    const validCatIds = await validateCategoryIds(categoryIds);
    console.log(validCatIds);
    if (validCatIds) return res.status(validCatIds.status).json({ message: validCatIds.message });

    const newPost = await BlogPost
    .create({ userId: id, title, content, published: new Date(), updated: new Date() });
    return res.status(201).json({ id: newPost.id, title, content, userId: newPost.userId });
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// router.get('/', validateJWT, async (req, res) => {
//   const users = await Users.findAll();
//   if (!users) res.status(401).json({ message: 'Algo deu errado' });

//   return res.status(200).json(users);
// });

// router.get('/:id', validateJWT, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await Users.findByPk(id);

//     if (!user) return res.status(404).json({ message: 'User does not exist' });

//     return res.status(200).json(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Algo deu errado' });
//   }
// });

module.exports = router;

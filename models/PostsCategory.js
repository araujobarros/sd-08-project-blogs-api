module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostCategory',
    {},
    { timestamps: false });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie,
      {
        as: 'categories',
        through: PostsCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
  };

  return PostsCategory;
};
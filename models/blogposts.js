const BlogPostsModel = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    // id: DataTypes.STRING, // gera automaticamente
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true }, // A declaração da Foreign Key é opcional no model
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });
  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, { foreignKey: 'id', as: 'users' });
  };
  return BlogPosts;
};

module.exports = BlogPostsModel;

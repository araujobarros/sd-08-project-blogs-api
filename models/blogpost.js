const BlogPost = (sequelize, DataTypes) => {
  const blogPostTb = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belogsTo(models.User,
      { foreignKey: 'userId', as: 'users' });
  };

  return blogPostTb;
};

module.exports = BlogPost;

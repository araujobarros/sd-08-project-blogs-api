const defineBlogPostModel = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,    
  }, { timestamps: false });

  return BlogPost;
};

module.exports = defineBlogPostModel;
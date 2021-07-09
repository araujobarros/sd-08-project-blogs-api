module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      displayName: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      image: { type: Sequelize.STRING },
    }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('users'),
};
'use strict';

module.exports = (sequelize, DataTypes) => {
  class post extends sequelize.Sequelize.Model {}

  post.init({
    post: {type: DataTypes.STRING,allowNull: false},
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });

  post.associate = function (models) {
    post.belongsTo(models.user)
  };
  return post;
};
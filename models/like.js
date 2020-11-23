'use strict';

module.exports = (sequelize, DataTypes) => {
  class like extends sequelize.Sequelize.Model {}

  like.init({
    like: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'like',
  });
  like.associate = function (models) {
    like.belongsTo(models.post)
    like.belongsTo(models.user)
    // associations can be defined here
  };
  return like;
};  
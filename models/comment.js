'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends sequelize.Sequelize.Model {}

  comment.init({
    comment: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  comment.associate = function (models) {
    comment.belongsTo(models.post)
    comment.belongsTo(models.user)
    // associations can be defined here
  };
  return comment;
};
"use strict";

module.exports = (sequelize, DataTypes) => {
  class user extends sequelize.Sequelize.Model {}

  user.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Name is required field" },
          notEmpty: { args: true, msg: "Name is required field" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : {args : true, msg : 'email already used'},
        validate: {
          notNull: { args: true, msg: "email is required field" },
          notEmpty: { args: true, msg: "email is required field" },
        },
      },
      password: { type: DataTypes.STRING, allowNull: false},
      verified: {type: DataTypes.BOOLEAN,defaultValue:false}
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  user.associate = function (models) {
    user.hasMany(models.post)
    user.hasMany(models.like)
    user.hasMany(models.comment)
    // associations can be defined here
  };
  return user;
};

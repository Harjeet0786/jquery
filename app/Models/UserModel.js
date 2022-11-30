// "use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //     /**
    //      * Helper method for defining associations.
    //      * This method is not a part of Sequelize lifecycle.
    //      * The `models/index` file will call this method automatically.
    //      */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      username: DataTypes.STRING,
      room: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
      underscored: true,
    }
  );

  return User;
};

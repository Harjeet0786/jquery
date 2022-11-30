"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.myAssociation = models.Message.belongsTo(models.User, {
        foreignKey: "sender_id",
      });
      this.myAssociation = models.Message.belongsTo(models.User, {
        foreignKey: "reciever_id"
      });
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Message",
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
      underscored: true,
    }
  );

  return Message;
};

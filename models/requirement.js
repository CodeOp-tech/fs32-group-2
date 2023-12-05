"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Requirement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Requirement.belongsTo(models.Action);
      Requirement.hasMany(models.Volunteership);
    }
  }
  Requirement.init(
    {
      description: DataTypes.TEXT,
      capacity: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Requirement",
    }
  );
  return Requirement;
};

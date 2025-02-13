"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			//User.hasMany(models.Volunteership);
			User.belongsToMany(models.Requirement, { through: models.Volunteership }); // only get junction table info if models. is included
			User.belongsToMany(models.Keyword, { through: "Preferences" });
			User.hasMany(models.Action, { foreignKey: "organiserId" });
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				//below is the process for appling a function to the value that was provided by the post route and storing the result (instead of storing the original value)
				set(value) {
					// bcrypt.hashSync is the synchronous version of bcrypt.hash.
					// for this particular use case the async version will not work (who knows why...)
					const hash = bcrypt.hashSync(value, saltRounds);
					console.log(value, hash);
					this.setDataValue("password", hash);
				},
			},
			organisation: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			city: DataTypes.STRING,
			longitude: DataTypes.NUMBER,
			latitude: DataTypes.NUMBER,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};

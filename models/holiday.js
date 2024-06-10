'use strict';
const {
    Model 
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Holiday extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Holiday.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },                  
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
},
    {
    sequelize,
    modelName: 'Holiday',
    tableName: "holidays",
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true, //use for soft delete with using deleted_at
    underscored: true
});
return Holiday;
};
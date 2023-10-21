const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Customers = sequelize.define('customers', {
        ID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
            //autoIncrement: true
        },
        NAME: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ADDRESS: {
            type: DataTypes.STRING,
            allowNull: true
        },
        PHONE_NUMBER: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EMAIL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        PASSWORD: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        IMAGE:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {

            //freezeTableNmae:true
            timestamps: false
        }

    );
    return Customers;

}


const { DataTypes } = require("sequelize");
const { sequelize, shops } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Advertisement = sequelize.define('advertisement', {


        ID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        FILE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SHOP_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: shops,
            referenceskey: 'ID'
        },
        START_DATE: {
            type: DataTypes.DATE,
            allowNull: false
        },
        FINAL_DATE: {
            type: DataTypes.DATE,
            allowNull: false
        },

    },
        {
            timestamps: false
        },
        {
            freezeTableNmae: true
        }

    );
    return Advertisement;

}
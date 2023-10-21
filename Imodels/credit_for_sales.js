const { DataTypes } = require("sequelize");
const { sequelize, credits } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Credit_for_sale = sequelize.define('credit_for_sale', {
        ID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },

        PRICE: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        creditID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: credits,
            referenceskey: 'ID'
        },


    },



        {
            freezeTableNmae: true
        }

    );
    return Credit_for_sale;

}

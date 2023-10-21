const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Purchase_statuses = sequelize.define('purchase_statuses', {

        ID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            //autoIncrement: true
        },
        DESCRIPTION: {
            type: DataTypes.STRING,
            allowNull: true
        },


    },
        {
            freezeTableNmae: true
        }

    );
    return Purchase_statuses;

}


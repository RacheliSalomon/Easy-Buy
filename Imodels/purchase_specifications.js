const { DataTypes } = require("sequelize");
const { purchase_statuses } = require(".");
const { sequelize, purchases } = require(".");


module.exports = (sequelize, DataTypes) => {

    const Purchase_specifications = sequelize.define('purchase_specifications', {

        ID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        PURCHASE_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: purchases,
            referenceskey: 'ID'
        },
        //קוד תעודת הזדכות. מאותחל בNULL .
        ZIKUI_MAKOR_ID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: purchases,
            referenceskey: 'ID'
        },
        DESCRIOTION: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SUM: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        ADDITIONAL_DESCRIPTION: {
            type: DataTypes.STRING,
            allowNull: true
        },
        STATUS_CODE: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: purchase_statuses,
            referenceskey: 'ID'

        },
        BAR_CODE: {
            type: DataTypes.STRING,
            allowNull: false,

        },


    },
        {
            freezeTableNmae: true
        }

    );
    return Purchase_specifications;

}

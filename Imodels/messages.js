const { DataTypes } = require("sequelize");
const { sequelize, customers, shops_status_per_customers } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Messages = sequelize.define('messages', {
        ID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        CUSTOMER_PER_SHOP_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: shops_status_per_customers,
            referenceskey: 'ID'
        },
        REQUEST_SUBJECT: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DESCRIPTION: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SEND_DATE: {
            type: DataTypes.DATE,
            allowNull: false,

        },


    },
        {
            freezeTableNmae: true
        }

    );
    return Messages;

}


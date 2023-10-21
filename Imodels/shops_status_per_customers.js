const { DataTypes } = require("sequelize");
const { sequelize, customers, shops } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Shops_status_per_customers = sequelize.define('shops_status_per_customers', {

        ID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        customerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: customers,
            referenceskey: 'ID'

        },
        shopID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: shops,
            referenceskey: 'ID'
        },
        IS_CLUB: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        VALIDATE_CLUB: {
            type: DataTypes.DATE,
            allowNull: true
        },





    },
        {
            freezeTableNmae: true
        }

    );
    return Shops_status_per_customers;

}


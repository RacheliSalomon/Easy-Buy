const { DataTypes } = require("sequelize");
const { sequelize, shops_status_per_customers, shops, customers } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Purchases = sequelize.define('purchases', {

        ID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            //autoIncrement: true
        },

        shopID: {
            type: DataTypes.INTEGER,
            references: shops,
            referenceskey: 'ID'

        },
        customerID: {
            type: DataTypes.INTEGER,
            references: customers,
            referenceskey: 'ID'
        },


        DATE: {
            type: DataTypes.DATE,
            allowNull: false
        },

        SUM_FOR_PAYMENT: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        MEANS_OF_PAYMENT: {
            type: DataTypes.STRING,
            allowNull: false,

        },

        //משתנה בוליאני המתאר אם הקבלה היא תעודת רכישה או הזדכות. 0 לרכישה 1 להזדכות
        TYPE: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: 0,
        },




    },
        {
            //freezeTableNmae:true  
            timestamps: false
        },
        {

        }

    );
    return Purchases;

}


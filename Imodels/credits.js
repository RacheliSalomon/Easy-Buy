const { DataTypes } = require("sequelize");
const { sequelize, purchases } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Credits = sequelize.define('credits', {

        ID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            //autoIncrement: true
        },

        purchaseID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: purchases,
            referenceskey: 'ID'

        },
        DATE_OF_ISSUE: {
            type: DataTypes.DATE,
            allowNull: true
        },

        EXPIRATION_DATE: {
            type: DataTypes.DATE,
            allowNull: false
        },
        CREDIT_AMOUNT: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        MORE_DETAILS: {
            type: DataTypes.STRING,
            allowNull: true
        },
       
        OWNER_ID: {
            type: DataTypes.INTEGER
        }




    },
        {
            timestamps: false
        },
        {
            freezeTableNmae: true
        }

    );
    return Credits;

}


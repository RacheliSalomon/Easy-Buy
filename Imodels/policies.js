const { DataTypes } = require("sequelize");
const { sequelize, shops } = require(".");


module.exports = (sequelize, DataTypes) => {

    const Policies = sequelize.define('policies', {
        ID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
            //autoIncrement: true
        },
        SHOP_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: shops,
            referenceskey: 'ID'

        },
        //תוך כמה ימים מתאפשרת החזרה
        RETURNING_DAYS: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        //תוך כמה ימים מקבלים החזר כספי 
        REFUND_DAYS: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        //תוך כמה ימים מקבלים החזר כספי מלא
        FULL_REFUND_DAYS: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        //אחוזי ניכוי עקב החזרת פריט
        DEDUCTION_PRECENTS: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        //אם הניכוי הוא רק בתשלום באשראי
        DEPENDS_CREDIT: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        //תוך כמה ימים מתאפשרת החלפה
        CHANGING_DAYS: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ALLOW_RETURNING_IN_SALE: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        ALLOW_CHANGING_IN_SALE: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    },
        {

            //freezeTableNmae:true
            timestamps: false
        }

    );
    return Policies;

}


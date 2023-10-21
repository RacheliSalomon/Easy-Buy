const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: true,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
)
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


db.advertisements = require('./advertisements')(sequelize, DataTypes)
db.credit_for_sales = require('./credit_for_sales')(sequelize, DataTypes)
db.credits = require('./credits')(sequelize, DataTypes)
db.customers = require('./customers')(sequelize, DataTypes)
db.messages = require('./messages')(sequelize, DataTypes)
db.purchase_specifications = require('./purchase_specifications')(sequelize, DataTypes)
db.purchase_statuses = require('./purchase_statuses')(sequelize, DataTypes)
db.purchases = require('./purchases')(sequelize, DataTypes)
db.purchse_specifications = require('./purchase_specifications')(sequelize, DataTypes)
db.shops_status_per_customers = require('./shops_status_per_customers')(sequelize, DataTypes)
db.shops = require('./shops')(sequelize, DataTypes)
db.policies = require('./policies')(sequelize, DataTypes)



//JOIN
db.credit_for_sales.belongsTo(db.credits, { foreigenKey: 'creditID' })
db.credits.belongsTo(db.purchases, { foreigenKey: 'purchaseID' })
db.shops_status_per_customers.belongsTo(db.shops,{foreigenKey:'shopID'})
db.shops_status_per_customers.belongsTo(db.customers,{foreigenKey:'customerID'})
db.purchases.belongsTo(db.shops,{foreigenKey:'shopID'})
db.purchases.belongsTo(db.customers,{foreigenKey:'customerID'})



db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })
module.exports = db

const db = require("../Imodels/index")
const policyDB = db.policies;
const { Op } = require("sequelize");


exports.getAllPloicies = async () => {
    return await policyDB.findAll();
}




exports.createPolicy = async (policyObj) => {
    return await policyDB.create(policyObj);
}




exports.getPloicyById = async (id) => {

    return await policyDB.findAll({ where: { ID: id } })
}




exports.updatePloicyById = async (id, dataToUpdate) => {
    return await policyDB.update(dataToUpdate, { where: { ID: id } })
}




exports.deletePloicyById = async (id) => {
    return await policyDB.destroy({ where: { ID: id } })
}




exports.getPloicyByShopId = async (shopId) => {
    return await policyDB.findAll({ where: { SHOP_ID: shopId } })
}




exports.updatePloicyByShopId = async (shopId, dataToUpdate) => {
    return await policyDB.update(dataToUpdate, { where: { SHOP_ID: shopId } })
}
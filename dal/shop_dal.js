const db = require("../Imodels/index")
const ShopDB = db.shops;



exports.createShop = async (shop) => {
  console.log('shop', shop);
  return await ShopDB.create(shop)
}




exports.getAllShops = async () => {
  data = await ShopDB.findAll()
  data.sort((a, b) => {
    return a.updateAt - b.updateAt;
  });
  return data;
}




exports.getShopById = async (id) => {
  return await ShopDB.findByPk(id)
}




exports.updateShopById = async (id, dataToUpdate) => {
  return await ShopDB.update(dataToUpdate, {
    where: { ID: id }
  })
}




exports.deleteShopById = async (id) => {
  return await ShopDB.destroy({
    where: { ID: id }
  })
}

const shopPerCustomerBD = db.shops_status_per_customers
exports.getShopsPerCustomer = async (customerId) => {
  return await shopPerCustomerBD.findAll(
    { include: [{ model: ShopDB }], where:{customerID: customerId}}
    
    
    

  )
}






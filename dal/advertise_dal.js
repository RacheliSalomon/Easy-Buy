const db = require("../Imodels/index")
const AdvertiseDB = db.advertisements;




exports.createAdvertise = async (advertise) => {
  return await AdvertiseDB.create(advertise)
}




exports.getAllAdvertisements = async () => {

  return await AdvertiseDB.findAll();


};




exports.getAdvertiseById = async (id) => {
  return await AdvertiseDB.findByPk(id);
};




exports.getAllAdvertiseByShopId = async (shop_id) => {
  return await AdvertiseDB.findAll({
    where: { SHOP_ID: shop_id }
  })
}




exports.updateAdvertise = async (id, req_body) => {
  return await AdvertiseDB.update(req_body, {
    where: { ID: id }
  })
};




exports.deleteAdvertise = async (id) => {
  return await AdvertiseDB.destroy({
    where: { ID: id }
  })

};



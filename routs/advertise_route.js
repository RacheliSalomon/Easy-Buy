const express = require("express");
const advertiseController = require("../controllers/advertise_ctrl");
const advertiseRouter = express.Router();



advertiseRouter.route("/")
    .post(advertiseController.createAdvertise)

advertiseRouter.route("/:id")
    .get(advertiseController.getAdvertiseById)
    .put(advertiseController.updateAdvertise)
    .delete(advertiseController.deleteAdvertise)

    advertiseRouter.route("/shop/:id")
    .get(advertiseController.getAllAdvertiseByShopId)
    
module.exports = advertiseRouter; 
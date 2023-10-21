const express = require("express");
const recieptController = require("../controllers/reciept_ctrl");
const recieptRouter = express.Router();



recieptRouter.route("/")
    .put(recieptController.updateReciept)
    .post(recieptController.createReciept)
    .get(recieptController.getAllReciepts)
    .delete(recieptController.deleteReciept)


recieptRouter.route("/:id")
    .get(recieptController.getRecieptById)
    .put(recieptController.updateReciept)

recieptRouter.route("/customer/:id")
    .get(recieptController.getAllPurchasesByCustomerIdAndShopId)

recieptRouter.route("/barCodes")
    .get(recieptController.getPurchasesSpecificationByBarCode)


module.exports = recieptRouter; 
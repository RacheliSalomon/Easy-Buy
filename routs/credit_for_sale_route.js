const express = require("express");
const cfsController = require("../controllers/credit_for_sale_ctrl");
const cfsRouter = express.Router();



cfsRouter.route("/")
    .post(cfsController.createCfs)
    .get(cfsController.getAllCfs)





cfsRouter.route("/:id")

    .get(cfsController.getCfsById)
    .put(cfsController.updateCfsById)
    .delete(cfsController.deleteCfsById_buy);


cfsRouter.route("credit/:id")
    .get(cfsController.getCfsByCreditId)






module.exports = cfsRouter;

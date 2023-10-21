const express = require("express");
const zikuiController = require("../controllers/zikui_ctrl");
const zikuiRouter = express.Router();



zikuiRouter.route("/:id")
    .get(zikuiController.getZikuiSpecificationById)
    .post(zikuiController.createZikui)

zikuiRouter.route("/source/:id")
    .get(zikuiController.getZikuiSourceById)

zikuiRouter.route("/shop/:id")
    .get(zikuiController.getAllZikuiByShopIdAnsCustomerId)

module.exports = zikuiRouter;

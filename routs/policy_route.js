const express = require("express");
const policyController = require("../controllers/policy_ctrl");
const policyRouter = express.Router();



policyRouter.route("/")
    .get(policyController.getAllPloicies)
    .post(policyController.createPolicy)

policyRouter.route("/:id")
    .get(policyController.getPloicyById)
    .put(policyController.updatePloicyById)
    .delete(policyController.deletePloicyById)

policyRouter.route("/shop/:id")
    .get(policyController.getPloicyByShopId)
    .put(policyController.updatePloicyByShopId)



module.exports = policyRouter; 
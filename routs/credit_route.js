const express = require("express");
const creditController = require("../controllers/credit_ctrl");
const creditRouter = express.Router();



creditRouter.route("/")
    .post(creditController.createCredit)
    .get(creditController.getAllCreditsByExpirationDate)

creditRouter.route("/:id")
    .get(creditController.getCreditById)
    .put(creditController.updateCredit)//מימוש חלקי של זיכוי
    .delete(creditController.deleteCredit)//מימוש מלא של זיכוי

creditRouter.route("/customer/:id")
    .get(creditController.getAllCreditsByCustomerIdAndShopId)



module.exports = creditRouter; 
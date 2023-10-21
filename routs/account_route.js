const express = require("express");
const accountController = require("../controllers/account_ctrl");
const accountRouter = express.Router();


console.log("post")
accountRouter.route("/")
    .get(accountController.getAllAccount)
    .post(accountController.createAccount)


accountRouter.route("/:id")
    .get(accountController.getAccountByPassword)
    .put(accountController.updateAccount)
    .delete(accountController.deleteAccountById);








module.exports = accountRouter;
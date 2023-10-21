const express = require("express");
const approveController = require("../controllers/approve_ctrl")
const approveRouter = express.Router();


//בודק האם אפשר להחזיר מוצר, באיזה סכום יזוכה הלקוח ובאיזה אופן
approveRouter.route("/returning")
    .get(approveController.approveReturning)


//בודק האם אפשר להחליף מוצר
// req.params.id contains bar code of item for changing
approveRouter.route("/changing/:id")
    .get(approveController.approveChanging)


//בודק אם אפשר לממש זיכוי
approveRouter.route("/crediting/:id")
    .get(approveController.approveCrediting)

module.exports = approveRouter; 
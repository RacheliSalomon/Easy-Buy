require('dotenv').config();
const express = require('express')
const cors = require("cors");

const app = express()
const PORT = 2000//process.env.PORT || 8000
app.use(cors());
app.use(express.json())
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const accountRouter = require('./routs/account_route');
const advertiseRouter = require('./routs/advertise_route');
const creditRouter = require('./routs/credit_route');
const recieptRouter = require('./routs/reciept_route');
const shopRouter = require('./routs/shop_route');
const cfsRouter = require('./routs/credit_for_sale_route');
const zikuiRouter = require('./routs/zikui_route');
const policyRouter = require('./routs/policy_route');
const approveRouter = require('./routs/approve_route')

app.use("/reciept", recieptRouter);
app.use("/account", accountRouter);
app.use("/advertise", advertiseRouter);
app.use("/credit", creditRouter);
app.use("/shop", shopRouter);
app.use("/cfs", cfsRouter);
app.use("/zikui", zikuiRouter);
app.use("/policy", policyRouter);
app.use("/apprrove", approveRouter)

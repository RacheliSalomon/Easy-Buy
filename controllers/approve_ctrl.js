const db = require("../Imodels/index")
const approveSRV = require('../services/approve_srv')
const policyDB = require('../dal/policy_dal')
const reciptDB = require('../dal/reciept_dal')
const creditDB = require('../dal/credit_dal')

class ApproveController {

  approveReturning = async (req, res) => {

    //req.body.reciptId contains id of reciption object
    //req.body.shopId contains shop id
    //req.body.barCodes contains barCodes of items for returning



    const policy = await policyDB.getPloicyByShopId(req.body.shopId);
    console.log(policy);
    const recipt = await reciptDB.getRecieptById(req.body.reciptId);
    console.log(recipt);
    const items = await reciptDB.getPurchasesSpecificationByBarCode(req.body.barCodes);
    console.log(items);

    try {
      const data = await approveSRV.approveReturning(policy, recipt, items)
        .then(data => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot approve this returning .`
            });
          }
        })
    }
    catch (err) {
      res.status(500).send({
        message: "Error retrieving returning"
      });
    }


  };


  approveChanging = async (req, res) => {
    // req.params.id contains bar code of item for changing

    const barCode = req.params.id;



    const purchase = await reciptDB.getPurchaseBySpecificationBarCode(barCode);

    const shop_id = purchase.SHOP_ID;


    const policy = await policyDB.getPloicyByShopId(shop_id);
    try {

      const data = await approveSRV.approveChanging(purchase, policy)

      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot approve this returning .`
        });
      }
    }

    catch (err) {
      (
        res.status(500).send({
          message: "Error retrieving returning"
        })
      )

    }

  };


  approveCrediting = async (req, res) => {
    //req.params.id contains id of credit
    //req.body.sum contains sum of items for returning

    const credit = await creditDB.getCreditById(req.params.id);

    try {
      const data = await approveSRV.approveCrediting(credit, req.body.sum);

      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot approve this crediting .`
        });
      }
    }

    catch (err) {
      res.status(500).send({
        message: "Error retrieving crediting"
      });
    }


  };
}


const approveController = new ApproveController();

module.exports = approveController;
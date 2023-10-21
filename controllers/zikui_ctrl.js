const zikuiDB = require('../dal/zikui_dal')
const db = require('../Imodels/index')



class ZikuiController {


  createZikui = (req, res) => {




    //req.body.specifications contains itemd specifiacations for zikui,
    //req.body contains obhect of zikui, like here
    //id contains the purchase id
    const zikui = {

      ID: req.body.ID,
      SHOP_ID: req.body.SHOP_ID,
      CUSTOMER_ID: req.body.CUSTOMER_ID,
      DATE: req.body.DATE,
      SUM_FOR_PAYMENT: req.body.SUM_FOR_PAYMENT,
      MEANS_OF_PAYMENT: req.body.MEANS_OF_PAYMENT,
      TYPE: 1

    }
    const id = req.params.id;
    const specifications = req.body.specifications;



    zikuiDB.createZikui(id, zikui, specifications)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot add zikui with id=${zikui.ID}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving zikui with id=" + zikui.ID
        });
      });



  };


  getZikuiSpecificationById = (req, res) => {
    var id = req.params.id;
    console.log(id);
    zikuiDB.getZikuiSpecificationById(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };


  getZikuiSourceById = (req, res) => {
    var id = req.params.id;
    zikuiDB.getZikuiSourceById(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };


  getAllZikuiByShopIdAnsCustomerId = (req, res) => {
    const customer_id = req.params.id;
    const shop_id = req.query.id;

    zikuiDB.getAllZikuiByShopIdAnsCustomerId(customer_id, shop_id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${shop_id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + shop_id
        });
      });
  };

}


const zikuiController = new ZikuiController();

module.exports = zikuiController;

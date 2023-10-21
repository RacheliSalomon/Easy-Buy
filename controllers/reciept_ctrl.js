
const recieptDB = require("../dal/reciept_dal")

class RecieptController {


  createReciept = (req, res) => {


    const reciept_spc = [];
    reciept_spc[0] = req.body[0];
    for (let i = 1; i < req.body.length; i++) {
      reciept_spc.push(req.body[i]);
    }
    console.log(reciept_spc);
    recieptDB.createReciept(reciept_spc)
      .then(data => {
        res.send(`add reciept ${data}`);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating reciept."
        });
      });

  };


  getAllReciepts = (req, res) => {




    recieptDB.getAllReciepts()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving reciepts."
        });
      });


  };


  getRecieptById = (req, res) => {

    var id = req.params.id;
    recieptDB.getRecieptById(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Reciept with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Reciept with id=" + id
        });
      });

  };


  updateReciept = (req, res) => {
    var dataToUpdate = req.body;
    recieptDB.updateReciept(dataToUpdate)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Reciept was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Reciept with id=. Maybe Reciept was not found or req.body is empty!`//${id}
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Reciept with id="// + id
        });
      });

  };


  deleteReciept = (req, res) => {
    const id_r = req.body.id_r;
    const id_s = req.body.id_s;
    recieptDB.deleteReciept(id_r, id_s)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Shop was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete shop with id=${id}. Maybe shop was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete shop with id=" + id
        });
      });

  };


  getAllPurchasesByCustomerIdAndShopId = (req, res) => {
    const customer_id = req.params.id;
    const shop_id = req.query.id;
    const type=req.query.type;
   
    recieptDB.getAllPurchasesByCustomerIdAndShopId(customer_id, shop_id,type)
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


  getPurchasesSpecificationByBarCode = (req, res) => {

    recieptDB.getPurchasesSpecificationByBarCode(req.body.barCodes)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find PurchasesSpecification with id=${req.body}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving PurchasesSpecification with id=" + req.body
        });
      });

  };

}


const recieptController = new RecieptController();

module.exports = recieptController;
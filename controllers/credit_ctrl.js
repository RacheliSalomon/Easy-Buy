const creditDB = require('../dal/credit_dal')
const db = require('../Imodels/index')
const Op = db.Sequelize.Op;
const cfsDB = require('../dal/credit_for_sale_dal')


class CreditController {

  createCredit = (req, res) => {

    const credit = {

      ID: req.body.ID,
      purchaseID: req.body.purchaseID,
      DATE_OF_ISSUE: req.body.DATE_OF_ISSUE,
      EXPIRATION_DATE: req.body.EXPIRATION_DATE,
      CREDIT_AMOUNT: req.body.CREDIT_AMOUNT,
      MORE_DETAILS: req.body.MORE_DETAILS,

    }
    const specifications = req.body.specifications;

    creditDB.createCredit(credit, specifications)
      .then(data => {
        res.send(`add credit ${data}`);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating reciept."
        });
      });



  };



  getAllCreditsByExpirationDate = (req, res) => {


    const numOfDays = req.query.numDays;
    const customer_id=req.query.customer_id;
    creditDB.getAllCreditsByExpirationDate(numOfDays,customer_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving credits."
        });
      });

  };



  getCreditById = (req, res) => {
    var id = req.params.id;
    creditDB.getCreditById(id)
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



  getAllCreditsByCustomerIdAndShopId = (req, res) => {
    const customer_id = req.params.id;
    const shop_id = req.query.id;

    creditDB.getAllCreditsByCustomerIdAndShopId(customer_id, shop_id)
      .then(data => {
        if (data)
          res.send(data);
        else
          res.status(404).send({
            message: `Cannot find Tutorial with id=${customer_id}.`
          });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + customer_id
        });
      });

  };


  ///,אם הזיכוי הזה עומד למכירה, עדכון מחיר הזיכוי שעומד למכירה בערך דיפולטיבי-פחות 5 אחוזפונקציה שמשנה סכום של זיכוי- כלומר ממשו חלק ממנו,   
  updateCredit = (req, res) => {
    var id = req.params.id;
    var dataToUpdate = req.body;

    creditDB.updateCredit(id, dataToUpdate)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Credit price was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Credit price with id=${id}. Maybe Credit was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Credit price with id=" + id
        });
      });

  };


  //מימוש מלא של זיכוי
  deleteCredit = (req, res) => {
    var id = req.params.id;
    console.log(id)
    creditDB.deleteCredit(id)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Credit was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Credit with id=${id}. Maybe Credit was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Credit with id=" + id
        });
      });

  };
}

const creditController = new CreditController();

module.exports = creditController;
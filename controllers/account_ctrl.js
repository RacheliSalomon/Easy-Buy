const AccountDB = require("../dal/account_dal")
//const Op = db.Sequelize.Op;

class AccountController {

  createAccount = (req, res) => {


    const account = {
      ID: req.body.ID,
      NAME: req.body.NAME,
      ADDRESS: req.body.ADDRESS,
      PHONE_NUMBER: req.body.PHONE_NUMBER,
      EMAIL: req.body.EMAIL,
      PASSWORD: req.body.PASSWORD
    };

    AccountDB.createAccount(account)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the account."
        });
      });

  };


  getAllAccount = (req, res) => {


    AccountDB.getAllAccount()
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find all Accounts .`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Accounts"
        });
      });
  };


  getAccountByPassword = (req, res) => {
    const password = req.params.id;
    
    AccountDB.getAccountByPassword(password)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Account with password=${password}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Account with id=" + password
        });
      });
  };


  updateAccount = (req, res) => {
    const id = req.params.id;

    AccountDB.updateAccount(id, req.body)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Account was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Account with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Account with id=" + id
        });
      });
  };


  deleteAccountById = (req, res) => {
    const id = req.params.id;
    AccountDB.deleteAccountById(id)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete account with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete account with id=" + id
        });
      });


  };


  getAccountById = (req, res) => {
    const id = req.params.id;
    AccountDB.getAccountById(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Account with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Account with id=" + id
        });
      });
  };






 
}

const accountController = new AccountController();

module.exports = accountController;
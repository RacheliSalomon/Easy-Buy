const PolicyDB = require("../dal/policy_dal")


class PolicyController {
  getAllPloicies = (req, res) => {


    PolicyDB.getAllPloicies()
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find all Policies .`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Policies"
        });
      });
  };


  createPolicy = (req, res) => {

    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }



    PolicyDB.createPolicy(req.body)
      .then(data => {
        res.send(`add policy ${data}`);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating policy."
        });
      });
  };


  getPloicyById = (req, res) => {
   

    const id = req.params.id;
    PolicyDB.getPloicyById(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find  Policiy by id .`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Policy by id"
        });
      });

  };


  updatePloicyById = (req, res) => {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const id = req.params.id;
    PolicyDB.updatePloicyById(id, req.body)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Policy was update successfully!"
          });
        } else {
          res.send({
            message: `Cannot update Policy with id=${id}. Maybe Policy was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not update Policy with id=" + id
        });
      });

  };


  deletePloicyById = (req, res) => {
    const id = req.params.id;
    PolicyDB.deletePloicyById(id)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Policy was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Policy with id=${id}. Maybe Policy was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Policy with id=" + id
        });
      });

  };


  getPloicyByShopId = (req, res) => {
    const id = req.params.id;
    PolicyDB.getPloicyByShopId(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find  Policiy by shop id .`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Policy by shop id"
        });
      });
  };


  updatePloicyByShopId = (req, res) => {

    console.log(req.body);
    // if (!req.body.title) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
    const id = req.params.id;

    PolicyDB.updatePloicyByShopId(id, req.body)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Policy was update successfully!"
          });
        } else {
          res.send({
            message: `Cannot update Policy with id=${id}. Maybe Policy was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not update Policy with id=" + id
        });
      });
  }



}

const policyController = new PolicyController();

module.exports = policyController;

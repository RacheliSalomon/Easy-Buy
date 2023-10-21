const cfsDB = require('../dal/credit_for_sale_dal')


class CfsController {

  createCfs = (req, res) => {


    cfsDB.createCfs(req.body)
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


  getAllCfs=(req,res)=>{
    cfsDB.getAllCfs()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving credits."
        });
      });

  }





  getCfsById = (req, res) => {
    var id = req.params.id;
    cfsDB.getCfsById(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Credit fo Sale with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Credit fo Sale with id=" + id
        });
      });

  };



  updateCfsById = (req, res) => {

    var dataToUpdate = req.body;
    const id=req.params.id
    cfsDB.updateCfsById(id, dataToUpdate)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Credit fo Sale was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Credit fo Sale with id=${id}. Maybe Credit fo Sale was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Credit fo Sale with id=" + id
        });
      });

  };



  deleteCfsById_buy = (req, res) => {
    var id = req.params.id;
    const new_owner_id = req.query.id;
    console.log(id,new_owner_id);
    cfsDB.deleteCfsById_buy(id, new_owner_id)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Credit fo Sale was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Credit fo Sale with id=${id}. Maybe Credit fo Sale was not found!`
          });
         }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Credit fo Sale with id=" + id
        });
      });

  };



  getCfsByCreditId = (req, res) => {
    var creditId = req.params.id;
    cfsDB.getCfsByCreditId(creditId)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Credit fo Sale with credit id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Credit fo Sale with credit id=" + id
        });
      });

  };
}

const cfsController = new CfsController();

module.exports = cfsController;



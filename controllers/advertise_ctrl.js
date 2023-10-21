const db = require("../Imodels/index")
const advertiseDB = require('../dal/advertise_dal')

class AdvertiseController {

  createAdvertise = (req, res) => {




console.log("reqqqqq");
    console.log(req.body);

    const advertise = {
      //ID: req.body.ID,
      FILE: req.body.FILE,
      SHOP_ID: req.body.SHOP_ID,
      START_DATE: req.body.START_DATE,
      FINAL_DATE: req.body.FINAL_DATE,


    }


    advertiseDB.createAdvertise(advertise)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the advertise."
        });
      });
  };


  getAllAdvertiseByShopId = (req, res) => {
    const shop_id = req.params.id;
    advertiseDB.getAllAdvertiseByShopId(shop_id)
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


  getAllAdvertisements = (req, res) => {


    advertiseDB.getAllAdvertisements()
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find all Advertisements .`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Advertisements"
        });
      });
  };


  getAdvertiseById = async (req, res) => {
    var id = req.params.id;
    advertiseDB.getAdvertiseById(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find advertise with password=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving advertise with id=" + id
        });
      });

  };


  updateAdvertise = (req, res) => {
    var id = req.params.id;
    advertiseDB.updateAdvertise(id, req.body)


      .then(num => {
        if (num == 1) {
          res.send({
            message: "advertise was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update advertise with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating advertise with id=" + id
        });
      });
  };


  deleteAdvertise = async (req, res) => {
    var id = req.params.id;
    advertiseDB.deleteAdvertise(id)

      .then(num => {
        if (num == 1) {
          res.send({
            message: "advertise was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete advertise with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete advertise with id=" + id
        });
      });
  };
}

const advertiseController = new AdvertiseController();

module.exports = advertiseController;
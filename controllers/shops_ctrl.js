const ShopDB = require("../dal/shop_dal")

class ShopController {

  createShop = (req, res) => {
    const shop = {
      ID: req.body.ID,
      SHOP_NAME: req.body.SHOP_NAME,
      ADDRESS: req.body.ADDRESS,
      MANAGER_NAME: req.body.MANAGER_NAME,
      IMAGE: req.body.IMAGE
    };

    ShopDB.createShop(shop)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the shop."
        });
      });
  };


  getAllShops = (req, res) => {
    ShopDB.getAllShops()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving shops."
        });
      });
  };


  getShopById = (req, res) => {
    const id = req.params.id;
    console.log(id);
    ShopDB.getShopById(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving shop by id."
        });
      });
  };


  updateShopById = (req, res) => {
    var id = req.params.id;
    var dataToUpdate = req.body;
    ShopDB.updateShopById(id, dataToUpdate)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Shop was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Shop with id=${id}. Maybe Shop was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Shop with id=" + id
        });
      });
  };


  deleteShopById = (req, res) => {
    const id = req.params.id;

    ShopDB.deleteShopById(id)
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
  getShopsPerCustomer = (req, res) => {

    const customerId = req.params.id;

    ShopDB.getShopsPerCustomer(customerId)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving shops."
        });
      }
      );

  }


}
const shopController = new ShopController();

module.exports = shopController;
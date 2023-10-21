// /////////getAllAdvertiseByShopId
// .get(advertiseController.getAllAdvertiseByShopId)



// getAllAdvertiseByShopId = (req, res) => {
//     var shop_id = req.params.id;
//     advertiseDB.getAllAdvertiseByShopId(shop_id)
//     .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `Cannot find Tutorial with id=${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id=" + id
//         });
//       });
    
// }


// exports.getAllAdvertiseByShopId=async(shop_id)=>{
//     return await AdvertiseDB.findAll({
//         where:{SHOP_ID:shop_id}
//     })
// }



/////////////////getAllPurchasesByCustomerId
// .get(recieptController.getAllPurchasesByCustomerId)


// getAllPurchasesByCustomerId = (req, res) => {
//     var customer_id = req.params.id;
//     recieptDB.getAllPurchasesByCustomerId(customer_id)
//     .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `Cannot find Tutorial with id=${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id=" + id
//         });
//       });
    
// }


// exports.getAllPurchasesByCustomerId=async(customer_id)=>{
//     return await purchaseDB.findAll({
//         where:{CUSTOMER_ID:customer_id}
//     })
// }


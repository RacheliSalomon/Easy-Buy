const db = require("../Imodels/index")
const purchaseDB = db.purchases;
const purchase_spcDB = db.purchase_specifications;
const Op = db.Sequelize.Op;



// PURCHASE_SPECIFICATIN ושאר האוביקטים הם PURCHASEביצירת קבלה נשלח מערך ובו האיבר הראשון הוא אוביקט 
exports.createReciept = async (recieptArr) => {
    const purchase_spc = [];
    purchase_spc[0] = await purchaseDB.create(recieptArr[0])//
    for (let i = 1; i < recieptArr.length; i++) {
        let purchase_specific = await purchase_spcDB.create(recieptArr[i]);
        purchase_spc.push(purchase_specific);
    }
    return purchase_spc;


}




// exports.getAllPurchasesByCustomerIdAndShopId = async (customer_id, shop_id) => {
//     return await purchaseDB.findAll({
//         where: 
//         {
//             [Op.and]:
//                 [
//                     { customerID: customer_id },
//                     { shopID: shop_id }
//                 ]

//         }
//     })
// }



exports.getAllPurchasesByCustomerIdAndShopId=async(customer_id,shop_id,type)=>{
    
    

  
    const reciepts= await  purchaseDB.findAll({
         where:{customerID:customer_id,shopID:shop_id,TYPE:type}
     })

     const data = []
     for (const element of reciepts) {
       let dataUser = await this.getRecieptById(element.ID);
       data.push(dataUser);
     }
    
     return data;
  
 }
     



 

exports.getAllReciepts = async () => {

    return await purchaseDB.findAll()

}



// מחזיר קבלה מושלמת: רכישה ופרוט כל המוצרים שבה
exports.getRecieptById = async (id) => {

    const purchase = await purchaseDB.findByPk(id);

    const details = await purchase_spcDB.findAll({ where: { PURCHASE_ID: id } });

    return { purchase, details }

}




exports.updateReciept = async (dataToUpdate) => {
    const sarr = [];
    for (let i = 0; i < dataToUpdate.UP.length; i++) {

        const t = await purchase_spcDB.update(dataToUpdate.UP[i].STATUS_CODE, {

            where: { 
                [Op.and]:
                    [
                        {ID: dataToUpdate.UP[i].ID},
                        {PURCHASE_ID: dataToUpdate.ID}
                    ]
            }
        })
        sarr.push(t);
    }
    return sarr;

}





exports.deleteReciept = async (id_r, id_s) => {

    return await purchase_spcDB.destroy({
        where:{
            [Op.and]:
            [
                { ID: id_s}, 
                {PURCHASE_ID: id_r }
            ]
        } 
    })
}




exports.getPurchasesSpecificationByBarCode = (barCode) => {
    var ans = []
    barCode.forEach(async (element) => {
        ans.push(await purchase_spcDB.findOne({ where: { BAR_CODE: element } }))
    });
    return ans;
}




exports.getPurchaseBySpecificationBarCode = async (barCode) => {
    const purchase = await purchase_spcDB.findOne({ where: { BAR_CODE: barCode } })
    const purchase_id = purchase.PURCHASE_ID
    return await purchaseDB.findOne({ where: { ID: purchase_id } })
}
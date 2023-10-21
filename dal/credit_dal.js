const { Op } = require("sequelize");
const db = require("../Imodels/index")
const creditDB = db.credits;
const specificationsDB = db.purchase_specifications;
const cfsDB = db.credit_for_sales;
const purchaseDB = db.purchases;
const moment = require('moment');



//יצירת זיכוי וכל הפרוטים שלו
exports.createCredit = async (credit, specifications) => {

  var update = [];
  for (var i = 0; i < specifications.length; i++) {
    update.push(await
      specificationsDB.update({ STATUS_CODE: 2 }, {
        where: {
          ID: specifications[i]
        }
      })
    )
  }
  const create = await creditDB.create(credit)
  return { update, create }
}




const calculateDate = (daysToAdd) => {
  return moment().add(daysToAdd, 'days')
}




// שהתוקף שלהם עומד לפוג -קבלת כל הזיכויים ללא פרוט
exports.getAllCreditsByExpirationDate = async (numOfDaysToAdd, customer_id) => {

  const targetDate = calculateDate(numOfDaysToAdd)
  const today = new Date();
  console.log(targetDate);
  return await creditDB.findAll({ include: [{ model: db.purchases, attributes: [], where: { customerID: customer_id } }], where: { EXPIRATION_DATE: { [Op.between]: [today, targetDate] } } })
}




//קבלת זיכוי ופרוט הפריטים המזוכים שבו
exports.getCreditById = async (id) => {
  const credit = await creditDB.findByPk(id);
  const specifications = await specificationsDB.findAll(
    {
      where:
      {
        [Op.and]:
          [
            { PURCHASE_ID: credit.purchaseID },
            { STATUS_CODE: 2 }
          ]
      }
    });

  return { credit, specifications }
}





exports.getAllCreditsByCustomerIdAndShopId = async (customer_id, shop_id) => {

  const purchase_id = await purchaseDB.findAll({ where: { [Op.and]: [{ customerID: customer_id }, { shopID: shop_id }] } })


  const data=[]
  for (var i = 0; i < purchase_id.length; i++)  {
    let credit= await creditDB.findAll({ where: {  purchaseID: purchase_id[i].ID } });
    //let forSale=await cfsDB.findAll({where:{creditID:credit.ID}});
   
    data.push(credit);
  } 

  return data;






}




//עדכון כללי של זיכוי
exports.updateCredit = async (id, dataToUpdate) => {

  return await creditDB.update(dataToUpdate, {
    where: { ID: id }
  })
}




//מימוש חלק מזיכוי
//אם הזיכוי הזה עומד למכירה, עדכון מחיר הזיכוי שעומד למכירה בערך דיפולטיבי-פחות 5 אחוז. פונקציה שמשנה סכום של זיכוי,   
exports.updateCreditSum = async (id, sum) => {

  const updateCredit = await creditDB.update({ CREDIT_AMOUNT: sum }, { where: { ID: id } })

  const cfs = await cfsDB.getCfsByCreditId(id)//אם הזיכוי הזה עומד למכירה, עדכון מחיר הזיכוי שעומד למכירה בערך דיפולטיבי-פחות 5 אחוז

  if (cfs) {
    const new_price = sum * 0.95;
    const updateCfs = await cfsDB.updateCfsById({ PRICE: new_price }, { where: { creditID: id } })
    return { updateCredit, updateCfs }
  }

  return updateCredit;
}




//מימוש מלא של זיכוי: אם הוא נמצא גם בטבלת זיכויים למכירה- מחיקה שלו ג"כ
exports.deleteCredit = async (id) => {
  return await creditDB.destroy({
    where: { ID: id }
  })
}
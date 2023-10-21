const db = require("../Imodels/index")
const CfsDB = db.credit_for_sales;

const credit_dal = require("../dal/credit_dal");
const { credits } = require("../Imodels/index");
const credit_for_sales = require("../Imodels/credit_for_sales");
const { Op } = require("sequelize");




exports.createCfs = async (cfs) => {

  return await CfsDB.create(cfs)

};



// exports.getAllCfsByShopId = async (shopId) => {

// qry={}
// qry.include=[{model: db.credits},{ model: db.purchases, attributes: ['SHOP_ID']},{model: db.shops,attributes:['SHOP_NAME']}]




  // console.log(shopId)
  // return await CfsDB.findAll({
    

      // include: {
       

        // include:{model: db.shops,attributes:['SHOP_NAME'],
        // raw:true,where:{SHOP_ID:{[Op.eq]:ID}}},

        // raw: true,
        // where: {

        //   SHOP_ID: {
        //     [Op.eq]: shopId
        //   },
        // }
      // }
      // , raw: true
    // }]
    // , raw: true
  // });

// };




exports.getAllCfs = async () => {

  return await CfsDB.findAll({
    include: [{
      model: db.credits,

      //

      include: [{
        model: db.purchases, attributes: ['shopID'],

      
        include:[{model: db.customers,attributes:['NAME','EMAIL','IMAGE']},
        {model: db.shops,attributes:['SHOP_NAME','IMAGE']}],
        
        
        // where: {

        //   SHOP_ID: {
        //     [Op.eq]: shopId
        //   },
        // }
      }]
     
    }]
    
  });

};


exports.getCfsById = async (id) => {

  // const credit_id = await CfsDB.findByPk(id)
  // //.creditID;//קוד הזיכוי אותו מחפשים
  // const c = credit_id.creditID;

  // return await credit_dal.getCreditById(c);//CREDITS קבלת הזיכוי על פי הקוד שלו, ע"י קונטרולר של 


  return await CfsDB.findAll({
    include: [{
      model: db.credits,

      //

      include: [{
        model: db.purchases, attributes: ['shopID'],

      
        include:[{model: db.customers,attributes:['NAME','EMAIL']},
        {model: db.shops,attributes:['SHOP_NAME','IMAGE']}],
        
        

      }]
     
    }]
    ,where:{ID:id}
    
  });
};




exports.updateCfsById = async (id, req_body) => {

  return await CfsDB.update(req_body, {
    where: { ID: id }
  })

};



const creditDB=db.credits
exports.deleteCfsById_buy = async (id, new_owner) => {

  //מי הבעלים של הזיכוי שעומד להמחק
  const credit_id = await CfsDB.findAll({
    where: { ID: id }
  })

  console.log(credit_id[0].dataValues.ID);
  const creditID=credit_id[0].dataValues.ID

  //הבעלים החדשים 
  const data_to_update = {
    "OWNER_ID": new_owner
  }


  console.log(new_owner+"hhhhhhhhhhhh");
  //CREDITS עדכון הבעלים החדשים בטבלת 
  await creditDB.update(data_to_update,{where:{ID:creditID}})
  //...הוא נמכרC-CREDIT FOR SALE מחיקת הזיכוי מטבלת 
  return await CfsDB.destroy({
    where: { ID: id }
  })


};




exports.getCfsByCreditId = async (creditId) => {
  return await CfsDB.findOne({ where: { creditID: creditId } })
}
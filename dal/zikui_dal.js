const { Op } = require("sequelize")
const db = require("../Imodels/index")
const zikuiDB = db.purchases
const specificationsDB = db.purchase_specifications
const purchase_dal = require('./reciept_dal')




//יצירת תעודת החזרה
exports.createZikui = async (id, zikui, specifications) => {

    console.log(zikui)

    //יצירת תעודת הזדכות
    const zikui1 = await zikuiDB.create(zikui);
    //   ושינוי סטטוס בהנחה ש3 הוא "הוחזר"specifications עדכון קוד מקור ב 
    

    var specification = []
    for (var i = 0; i < specifications.length; i++) {
        console.log(i)
        specification.push(await specifications.update({ PURCHASE_ID: zikui1.ID, ZIKUI_MAKOR_ID: id, STATUS_CODE: 3 },
            {
                where: {
                    [Op.and]:
                        [
                            { PURCHASE_ID: id },
                            { ID: specifications[i] }
                        ]
                }
            }
        ))
    }


    return { zikui1, specification }

}



//צפיה בפרוט תעודת החזרה על פי ID : כולל הפרוט בטבלת PURCHASE_SPECIFICATION
exports.getZikuiSpecificationById = async (id) => {

    return await specificationsDB.findAll({ where: { PURCHASE_ID: id } });

}



//צפיה בקבלת מקור.
exports.getZikuiSourceById = async (id) => {

    const spcification = await specificationsDB.findAll({ where: { PURCHASE_ID: id } })
    var sources = [];

    spcification.forEach(element => {
        sources.push(purchase_dal.getRecieptById(element.ZIKUI_MAKOR_ID))
    });
    console.log(sources);
    return sources
}



//צפיה בתעודות ההחזרה על פי קוד חנות וקוד לקוח
exports.getAllZikuiByShopIdAnsCustomerId = async (customer_id, shop_id) => {
    return await zikuiDB.findAll({
        where: {
            [Op.and]:
                [{ TYPE: 1 }, { shopId: shop_id }, { customerId: customer_id }]
        }
    })

}
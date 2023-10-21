const db = require("../Imodels/index");

const AccountDB = db.customers;




exports.createAccount = async (account) => {
  
  return await AccountDB.create(account)

}




exports.getAllAccount = async () => {

  const data = await AccountDB.findAll();

  return data
};




exports.getAccountByPassword = async (password) => {

  console.log("here!!!!!!");
   const ans=await AccountDB.findOne({ where: { PASSWORD: password } });
   console.log("ans"+ans);
   return ans
};




exports.updateAccount = async (id, req_body) => {

  return await AccountDB.update(req_body, {
    where: { ID: id }
  })

};




exports.deleteAccountById = async (id) => {

  return await AccountDB.destroy({
    where: { ID: id }
  })

};




exports.getAccountById = async (id) => {

  return await AccountDB.findByPk({ where: { ID: id } });

};







const customersDAL = require("../DAL/customersDAL");

const getJsonData = async () => {
  return await customersDAL.getJsonFile();
};

const addCustomer = (customerData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allCustomers = await customersDAL.getJsonFile();
      allCustomers.push({
        firstname: customerData.firstname,
        lastname: customerData.lastname,
        phone: customerData.phone,
        email: customerData.email,
        plan: customerData.plan,
      });
      await customersDAL.writeToJsonFile(allCustomers);
      resolve({ ...customerData });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { getJsonData, addCustomer };

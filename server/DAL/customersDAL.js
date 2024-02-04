const jFile = require("jsonfile");

const getJsonFile = () => {
  return new Promise((resolve, reject) => {
    jFile.readFile(__dirname + "/customers.json", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const writeToJsonFile = (obj) => {
  return new Promise((resolve, reject) => {
    jFile.writeFile(__dirname + "/customers.json", obj, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
module.exports = { getJsonFile, writeToJsonFile };

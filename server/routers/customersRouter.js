const express = require("express");
const customersBL = require("../Models/customersBL");

const router = express.Router();

router.route("/").get(async function (req, resp) {
  let customers = await customersBL.getJsonData();
  return resp.json(customers);
});

router.route("/:id").get(async function (req, res) {
  let id = req.params.id;
  let customer = await customersBL.getCustomer(id);
  return res.json(customer);
});

router.route("/").post(async function (req, res) {
  let obj = req.body;
  let customer = await customersBL.addCustomer(obj);
  return res.json(customer);
});

module.exports = router;

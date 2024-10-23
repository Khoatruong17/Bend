const express = require("express");
const checkToken = require("../middlewares/checktoken");
const userManager = require("../controllers/Admin/managerUserController");

const routerClientAPI = express.Router();

routerClientAPI.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to ADMIN API" });
});

// Delay middleware
//routerAdminAPI.all("*", checkToken.checkToken);

// Manager Host

module.exports = routerClientAPI; //export default

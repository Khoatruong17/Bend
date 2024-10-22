const express = require("express");
const { checkToken, checkRoleHost } = require("../middlewares/checktoken");
const {
  getAllProperties,
  createProperty,
  deleteProperty,
  updateProperty,
} = require("../controllers/Host/propertiesController");

const routerHostAPI = express.Router();

routerHostAPI.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Host API" });
});

// Delay middleware
routerHostAPI.all("*", checkToken, checkRoleHost);

// Manager Host
routerHostAPI.get("/allProperties", getAllProperties);
routerHostAPI.post("/createProperties", createProperty);
routerHostAPI.delete("/deleteProperty/:id", deleteProperty);
routerHostAPI.put("/editProperty/:id", updateProperty);

module.exports = routerHostAPI;

const express = require("express");
const { checkToken, checkRoleHost } = require("../middlewares/checktoken");
const {
  getAllProperties,
  createProperty,
  deleteProperty,
  updateProperty,
} = require("../controllers/Host/propertiesController");

const typeRoom = require("../controllers/Host/typeRoomController");

const routerHostAPI = express.Router();

routerHostAPI.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Host API" });
});

// Delay middleware
routerHostAPI.all("*", checkToken, checkRoleHost);

// Manager properties
routerHostAPI.get("/allProperties", getAllProperties);
routerHostAPI.post("/createProperties", createProperty);
routerHostAPI.delete("/deleteProperty/:id", deleteProperty);
routerHostAPI.put("/editProperty/:id", updateProperty);

// Manager Rooms
routerHostAPI.get("/getAllTypeRoom", typeRoom.getAllTypeRooms);
routerHostAPI.post("/createTypeRoom", typeRoom.createNewTypeRoom);

module.exports = routerHostAPI;

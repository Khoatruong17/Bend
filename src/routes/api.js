const express = require("express");
const authController = require("../controllers/authController");
const propertiesController = require("../controllers/propertiesController");
const roomsController = require("../controllers/roomController");
const userController = require("../controllers/userController");
const checkToken = require("../middlewares/checktoken");

const routerAPI = express.Router();

routerAPI.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to API" });
});

routerAPI.post("/register", authController.createNewUser);
routerAPI.post("/login", authController.loginUser);

// Delay middleware
routerAPI.all("*", checkToken.checkToken);
//Users api

routerAPI.get("/getAllUsers", userController.getAllUsers);
//routerAPI.delete("/deleteUser/:id", authController.deleteUser);

routerAPI.get("/getAllProperties", propertiesController.getAllProperties);
routerAPI.post("/addProperties", propertiesController.createProperty);
routerAPI.put("/updateProperties/:id", propertiesController.updateProperty);
routerAPI.delete("/deleteProperties/:id", propertiesController.deleteProperty);

// Room Api
routerAPI.get("/getAllRoom", roomsController.getAllRooms);
routerAPI.post("/addRoom", roomsController.createRoom);
routerAPI.put("/updateRoom/:id", roomsController.updateRoom);
routerAPI.delete("/deleteRoom/:id", roomsController.deleteRoom);

module.exports = routerAPI; //export default

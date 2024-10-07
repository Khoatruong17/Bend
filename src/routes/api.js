const express = require("express");
const userController = require("../controllers/userController");

const routerAPI = express.Router();

routerAPI.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to API" });
});

routerAPI.post("/register", userController.createNewUser);

module.exports = routerAPI; //export default

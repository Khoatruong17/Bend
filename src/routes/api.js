const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const checkToken = require("../middlewares/checktoken");
const {
  postUploadMultipleFiles,
  uploadImage,
} = require("../controllers/fileController");

const multer = require("multer");
const routerAPI = express.Router();

routerAPI.post("/upload", postUploadMultipleFiles);
routerAPI.post("/image", uploadImage);
//routerAPI.get("/files/:id", downloadController);

routerAPI.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to API" });
});

routerAPI.post("/register", authController.createNewUser);
routerAPI.post("/login", authController.loginUser);

// Delay middleware
routerAPI.all("*", checkToken.checkToken);

routerAPI.get("/account", authController.getAccount);
//Users api

routerAPI.get("/getAllUsers", userController.getAllUsers);
routerAPI.get("/users/:userId", userController.getUsers);
//routerAPI.delete("/deleteUser/:id", authController.deleteUser);

module.exports = routerAPI; //export default

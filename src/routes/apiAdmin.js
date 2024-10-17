const express = require("express");
const checkToken = require("../middlewares/checktoken");
const userManager = require("../controllers/Admin/managerUserController");

const routerAdminAPI = express.Router();

routerAdminAPI.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to ADMIN API" });
});

// Delay middleware
//routerAdminAPI.all("*", checkToken.checkToken);

// Manager Host 
routerAdminAPI.get("/allHost",userManager.getAllHost)
routerAdminAPI.get("/getHost/:hostId",userManager.getHostById)
routerAdminAPI.post("/createHost",userManager.createHost)
routerAdminAPI.post("/banHost/:hostId",userManager.banHost)
routerAdminAPI.post("/unBanHost/:hostId",userManager.unBanHost)





module.exports = routerAdminAPI; //export default

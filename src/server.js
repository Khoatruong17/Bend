require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("../src/configs/viewEngine");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// import connection to database
const connection = require("../src/configs/database");
// import api file
const apiRoutes = require("../src/routes/api");
const apiARouters = require("../src/routes/apiAdmin");
const apiHRouters = require("../src/routes/apiHost");
// import controller

const app = express();
const port = process.env.PORT || 8888;

// enable cors middleware for cross-origin request
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config template engine
configViewEngine(app);

//khai báo route
app.use("/v1/api/", apiRoutes);
app.use("/v1/apiAdmin/", apiARouters);
app.use("/v1/apiHost/", apiHRouters);

(async () => {
  try {
    //using mongoose
    await connection();

    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();

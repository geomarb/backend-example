const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const { errorHandlingMiddleware } = require("./middlewares");

// create an instance of the express in the app
const app = express();

// use cors: a third-party middleware
// it adds "Access-Control-Allow-Origin: *" in the header of each response
// in production you MUST specify the origin instead of using "*"
app.use(cors());

// use cookie-parser: a third-party middleware
// it adds a "cookie" property in the request (req)
// in production you MUST add some configurations here for security reasons
// the cookie will be used later for the auth process
app.use(cookieParser());

app.use("/api", router);

app.use(errorHandlingMiddleware);

module.exports = app;

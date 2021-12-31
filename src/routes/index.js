const router = require("express").Router();

const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

router.use("/users", userRoutes);

module.exports = { router, authRoutes };

const router = require("express").Router();

const userRoutes = require("./user.router");
const authRoutes = require("./auth.router");

router.use("/users", userRoutes);

module.exports = { router, authRoutes };

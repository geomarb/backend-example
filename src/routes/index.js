const router = require("express").Router();
const { authMiddleware } = require("../middlewares");

const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);

module.exports = router;

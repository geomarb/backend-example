const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { authController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.post("/register", asyncHandler(authController.register));

router.post("/login", asyncHandler(authController.login));

router.get("/logout", authMiddleware, asyncHandler(authController.logout));

module.exports = router;

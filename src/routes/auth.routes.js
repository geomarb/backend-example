const router = require("express").Router();
const { authController, userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.post("/register", userController.create);

router.post("/login", authController.login);

router.get("/logout", authMiddleware, authController.logout);

module.exports = router;

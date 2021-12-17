const router = require("express").Router();
const { authController, userController } = require("../controllers");

router.get("/register", userController.create);

router.get("/login", authController.login);

router.get("/logout", authController.logout);

module.exports = router;

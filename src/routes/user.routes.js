const router = require("express").Router();
const { userController } = require("../controllers");

router.get("/", userController.getUsers);

module.exports = router;

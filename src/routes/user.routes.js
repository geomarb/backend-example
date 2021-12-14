const router = require("express").Router();
const { UserController } = require("../controllers");

router.get("/", UserController.getUsers);

module.exports = router;

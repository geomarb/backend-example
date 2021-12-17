const router = require("express").Router();
const { userController } = require("../controllers");

router.get("/", userController.getMany);

module.exports = router;

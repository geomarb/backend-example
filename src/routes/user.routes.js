const router = require("express").Router();
const { userController } = require("../controllers");

router.get("/", userController.get);
router.get("/:id", userController.getOne);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.patch("/", userController.changePassword);
router.delete("/:id", userController.delete);

module.exports = router;

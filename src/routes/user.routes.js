const router = require("express").Router();
const async = require("express-async-handler");
const { userController } = require("../controllers");
const { protectMiddleware } = require("../middlewares");

// only accessible by a logged user
router.get("/me", async(userController.getMe));
router.put("/me", async(userController.updateMe));
router.patch("/me/password", async(userController.updateMyPassword));

// only accessible by adm role
router.get("/", protectMiddleware, async(userController.get));
router.get("/:id", protectMiddleware, async(userController.findById));
router.put("/:id", protectMiddleware, async(userController.updateOne));
router.patch(
  "/:id/password",
  protectMiddleware,
  async(userController.updatePassword)
);
router.post("/", protectMiddleware, async(userController.createOne));
router.delete("/:id", protectMiddleware, async(userController.deleteOne));

module.exports = router;

const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { userController } = require("../controllers");
const { protectMiddleware } = require("../middlewares");

// only accessible by a logged user
router.get("/current", asyncHandler(userController.getCurrent));
router.put("/current", asyncHandler(userController.updateCurrent));
router.patch(
  "/current/password",
  asyncHandler(userController.updateMyPassword)
);

// only accessible by adm role
router.get("/", protectMiddleware, asyncHandler(userController.findAll));
router.get("/:id", protectMiddleware, asyncHandler(userController.findById));
router.put("/:id", protectMiddleware, asyncHandler(userController.updateOne));
router.patch(
  "/:id/password",
  protectMiddleware,
  asyncHandler(userController.updatePassword)
);
router.post("/", protectMiddleware, asyncHandler(userController.createOne));
router.delete(
  "/:id",
  protectMiddleware,
  asyncHandler(userController.deleteOne)
);

module.exports = router;

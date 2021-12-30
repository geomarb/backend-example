const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { userController } = require("../controllers");
const { protectedMiddleware } = require("../middlewares");

// only accessible by adm role
router.post("/", protectedMiddleware, asyncHandler(userController.create));
router.get("/", protectedMiddleware, asyncHandler(userController.get));
router.get("/:id", asyncHandler(userController.getOne));
router.put("/:id", asyncHandler(userController.update));
router.patch("/:id", asyncHandler(userController.updatePassword));
router.delete("/:id", asyncHandler(userController.delete));

// only accessible by a logged user
router.get("/me", asyncHandler(userController.getCurrent));
router.put("/me", asyncHandler(userController.update));

module.exports = router;

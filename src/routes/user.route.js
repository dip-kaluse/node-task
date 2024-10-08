const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.route("/").get(userController.queryUser);
router
  .route("/:userId")
  .get(authMiddleware, userController.getUser)
  .patch(authMiddleware, userController.updateUser)
  .delete(authMiddleware, userController.deleteUser);

module.exports = router;

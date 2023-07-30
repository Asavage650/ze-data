const router = require("express").Router();
const {
  getAllUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserbyId).delete(deleteUser).put(updateUser);
router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);
module.exports = router;

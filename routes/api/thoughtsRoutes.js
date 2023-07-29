const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtbyId,
  createThought,
  updateThoughtbyId,
  deleteThoughtbyId,
  createReaction,
  removeReaction,
} = require("../../controllers/thoughtsController");
router.route("/").get(getAllThoughts);
router.route("/:userId").post(createThought);
router
  .route("/:thoughtId")
  .get(getThoughtbyId)
  .put(createThought)
  .put(updateThoughtbyId)
  .delete(deleteThoughtbyId);
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(removeReaction);

module.exports = router;

const { thoughts, user, Types } = require("../models");
const thoughtsController = {
  getAllThoughts(req, res) {
    thoughts
      .find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getThoughtbyId({ params }, res) {
    console.log("params sent!", params);
    thoughts
      .findOne({ _id: params.thoughtId })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thoughts found with this id sorry!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createThought({ params, body }, res) {
    console.log("body in bound", body);
    thoughts
      .create(body)
      .then(({ _id }) => {
        return user.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "No user found with this Id sorry!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  updateThoughtbyId(req, res) {
    thoughts
      .findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, New: true }
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No thoughts found with this Id sorry!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteThoughtbyId(req, res) {
    thoughts
      .findByIdAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with this Id sorry!" })
          : user.findByIdAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "thought deleted, no user found." })
          : res.json({ message: "Thought deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    thoughts
      .findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: "No thought found with this Id sorry!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    thoughts
      .findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: "No thoughts found with this Id sorry!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

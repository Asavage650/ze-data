const { schema, model } = require("mongoose");

const userSchema = new schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

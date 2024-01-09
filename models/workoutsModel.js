const mongoose = require("mongoose");

const Workout = mongoose.model(
  "Workout",
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      saved_exercises: {
        type: [String],
      },
      saved_muscle_groups: {
        type: [String],
      },
      workouts_list: [
        {
          muscle_groups: String,
          exercises: [
            {
              exercise: { type: String },
              sets: { type: Number },
              reps: { type: Number },
            },
          ],
        },
      ],
    },
  )
);

module.exports = Workout;

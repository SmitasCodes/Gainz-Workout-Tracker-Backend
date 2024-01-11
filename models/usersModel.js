const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Please add a username"],
        unique: true,
      },
      email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
      },
      avatar: {
        type: String,
        default:
          "https://i.pinimg.com/originals/47/ba/71/47ba71f457434319819ac4a7cbd9988e.jpg",
      },
      routines: [
        {
          name: {
            type: String,
            required: [true, "Please add a routine name "],
          },
          exercises: [
            {
              name: {
                type: String,
                required: [true, "Please add a exercise name"],
              },
              // sets: { type: Number },
            },
          ],
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = User;

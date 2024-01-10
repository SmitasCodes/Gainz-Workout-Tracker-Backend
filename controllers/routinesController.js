const asyncHandler = require("express-async-handler");
const User = require("../models/usersModel");

//======================== ADD ROUTINE ========================//
// @desc Add new routine
// @route POST /api/routines
// @access PRIVATE

const addRoutine = asyncHandler(async (req, res) => {
  console.log(req.body)
  console.log(req.user.id)
//   const { name } = req.body.routines;

//   if (!name) {
//     res.status(400);
//     throw new Error("Please enter all fields");
//   }

//   const nameExist = await User.findOne({
//     routines: { $elemMatch: { name } },
//   });

//   if (nameExist) {
//     res.status(400);
//     throw new Error("Routine with same name already exist");
//   }

  //   const trying = await User.findOneAndUpdate(
  //     { username: "salsa1" },
  //     { $push: { routines: { name: name } } }
  //     // { new: true }
  //   );

  //   if (trying) {
  //     res.status(201).json({
  //       _name: name,
  //     });
  //   } else {
  //     res.status(400);
  //     throw new Error("Invalid user data");
  //   }
});

module.exports = { addRoutine };

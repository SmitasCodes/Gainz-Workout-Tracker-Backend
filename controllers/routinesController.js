const asyncHandler = require("express-async-handler");
const User = require("../models/usersModel");

//======================== ADD ROUTINE ========================//
// @desc Add new routine
// @route POST /api/routines
// @access PRIVATE

const addRoutine = asyncHandler(async (req, res) => {
  const { name } = req.body.routines;
  const { id } = req.user;

  if (!name) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const nameExist = await User.findOne({
    _id: id,
    routines: { $elemMatch: { name } },
  });

  if (nameExist) {
    res.status(400);
    throw new Error("Routine with same name already exist");
  }

  const createRoutine = await User.findOneAndUpdate(
    { _id: id },
    { $push: { routines: { name: name } } }
  );

  if (createRoutine) {
    res.status(201).json({
      created: "true",
      _name: name,
    });
  } else {
    res.status(400);
    throw new Error("Error");
  }
});

module.exports = { addRoutine };

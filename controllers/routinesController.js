const asyncHandler = require("express-async-handler");
const User = require("../models/usersModel");

//======================== ADD ROUTINE ========================//
// @desc Add new routine
// @route POST /api/routines
// @access PRIVATE

const addRoutine = asyncHandler(async (req, res) => {
  const { name } = req.body;
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
    { $push: { routines: { name } } }
  );

  if (createRoutine) {
    res.status(201).json({
      message: `Routine created`,
      _name: name,
    });
  } else {
    res.status(400);
    throw new Error("Error while trying to add routine");
  }
});

//======================== DELETE ROUTINE ========================//
// @desc Delete routine
// @route DELETE /api/routines/:id
// @access PRIVATE

const deleteRoutine = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userID = req.user.id;

  const query = { _id: userID, routines: { $elemMatch: { _id: id } } };

  const routineExist = await User.findOne(query);
  if (!routineExist) {
    res.status(404);
    throw new Error("Error, routine not found");
  }

  const deletedRoutine = await User.updateOne(query, {
    $pull: { routines: { _id: id } },
  });

  console.log(deletedRoutine.modifiedCount);

  if (deletedRoutine.modifiedCount > 0) {
    res.status(201).json({
      message: "Routine deleted",
    });
  } else {
    res.status(400);
    throw new Error("Error while trying to delete routine");
  }
});

//======================== ADD EXERCISE ========================//
// @desc Delete routine
// @route DELETE /api/:routineId/exercises
// @access PRIVATE

const addExercise = asyncHandler(async (req, res) => {
  const routineId = req.params.routineId;
  const userID = req.user.id;
  const { name, sets = "" } = req.body;

  const nameExist = await User.findOne({
    _id: userID,
    routines: {
      $elemMatch: {
        _id: routineId,
        exercises: { $elemMatch: { name } },
      },
    },
  });

  if (nameExist) {
    res.status(400);
    throw new Error("Exercise already exist");
  }

  const createExercise = await User.findOneAndUpdate(
    { _id: userID, routines: { $elemMatch: { _id: routineId } } },
    { $push: { "routines.$.exercises": { name, sets } } }
  );

  if (createExercise) {
    res.status(201).json({
      message: `Exercise created`,
      _name: name,
      _sets: sets,
    });
  } else {
    res.status(400);
    throw new Error("Error when trying to add exercise");
  }
});

//======================== DELETE EXERCISE ========================//
// @desc Delete exercise
// @route DELETE /api/:routineId/exercises/:exerciseId
// @access PRIVATE

const deleteExercise = asyncHandler(async (req, res) => {
  const routineId = req.params.routineId;
  const exerciseId = req.params.exerciseId;
  const userId = req.user.id;

  const query = {
    _id: userId,
    routines: {
      $elemMatch: {
        _id: routineId,
        exercises: { $elemMatch: { _id: exerciseId } },
      },
    },
  };

  const exerciseExist = await User.findOne(query);
  if (!exerciseExist) {
    res.status(404);
    throw new Error("Error, exercise not found");
  }

  const deletedExercise = await User.updateOne(query, {
    $pull: { "routines.$.exercises": { _id: exerciseId } },
  });

  if (deletedExercise.modifiedCount > 0) {
    res.status(200).json({
      message: "Exercise deleted",
    });
  } else {
    res.status(400);
    throw new Error("Error when trying to delete exercise");
  }
});

module.exports = { addRoutine, deleteRoutine, addExercise, deleteExercise };

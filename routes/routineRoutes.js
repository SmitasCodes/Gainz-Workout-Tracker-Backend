const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  addRoutine,
  deleteRoutine,
  addExercise,
  deleteExercise,
} = require("../controllers/routinesController");

router.post("/", protect, addRoutine);
router.delete("/:id", protect, deleteRoutine);
router.post("/:routineId/exercises", protect, addExercise);
router.delete("/:routineId/exercises/:exerciseId", protect, deleteExercise);

module.exports = router;

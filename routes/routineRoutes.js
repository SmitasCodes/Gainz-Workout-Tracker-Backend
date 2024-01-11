const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  addRoutine,
  deleteRoutine,
} = require("../controllers/routinesController");

router.post("/", protect, addRoutine);
router.delete("/:id", protect, deleteRoutine);

module.exports = router;

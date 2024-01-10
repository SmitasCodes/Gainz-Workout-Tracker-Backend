const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const { addRoutine } = require("../controllers/routinesController");

router.post("/", protect, addRoutine);

module.exports = router;

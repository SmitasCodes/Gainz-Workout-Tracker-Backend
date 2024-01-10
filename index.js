require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { registerUser, loginUser } = require("./controllers/userController");

connectDB();
const app = express();
app.use(express.json());

app.post("/api/users", registerUser);
app.post("/api/users/login", loginUser);
app.post("/api/users/loginn", loginUser);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

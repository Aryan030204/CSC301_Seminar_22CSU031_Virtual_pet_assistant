const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes.js");
const petRouter = require("./routes/pet.routes.js");

require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://virtual-pet-assistant-client.onrender.com",
    credentials: true, // allow cookies
  })
);
app.use(cookieParser());

app.use("/api/", userRouter);
app.use("/api/", petRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

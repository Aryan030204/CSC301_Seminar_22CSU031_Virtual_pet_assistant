const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.js");
const petRouter = require("./routes/pet.routes.js");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes.js");

require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser);

app.use("/api", userRouter);
app.use("/api/pets", petRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

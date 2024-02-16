import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import imageRoute from "./routes/imageRoute.js";

//configure env
dotenv.config();

//rest object
const app = express();

//database config
connectDB();

//middlewares
app.use(express.json());

//routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/upload", imageRoute);

//rest api
app.get("/", (req, res) => {
  return res.send("<h1>Backend Server</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//run listen

app.listen(PORT, () => {
  console.log(
    `Server Running On Mode ${process.env.MODE} on ${PORT}`.bgGreen.black
  );
});

import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes/itemRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes

app.use("/api/items", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

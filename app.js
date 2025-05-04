import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";
import assignedRoutes from "./routes/assignedRoutes.js";
import ErrorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
app.use("/api/items", itemRoutes);
app.use("/api/assigned", assignedRoutes);

// Error handling middleware
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

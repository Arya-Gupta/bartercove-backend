import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import Router from "./routes/product.route.js";
import errorHandler from "./middleware/error.js";

const app = express();
connectDb();

// Load config
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("welcome to products-api");
});
app.use("/api/products", Router);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));

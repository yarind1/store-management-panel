import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import productRoutes from "./routes/productRoutes.js";

// טעינת משתני סביבה
dotenv.config();

// חיבור לDB
connectDB();

const app = express();

//Middlewares
app.use(cors()); // מאפשר גישה מדומיינים אחרים
app.use(express.json()); // מאפשר לשרת לקרוא JSON שנשלח ב-Body

// Routes
app.use("/api/products", productRoutes);

//Server Activation
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

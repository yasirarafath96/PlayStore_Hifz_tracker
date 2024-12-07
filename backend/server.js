const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");
const itemRoutes = require("./routes/itemRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/items", itemRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

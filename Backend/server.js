require("dotenv").config();
console.log("Loaded GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "✅" : "❌ Missing");

const express = require("express");
const cors= require("cors");
const path = require("path");
const connectDB = require("./config/db")

const authRoutes = require('./routes/authRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')
const aiRoutes = require('./routes/aiRoutes')

const app = express();

//Middleware to handle CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

require("dotenv").config({ path: "./Backend/.env" });

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// console.log('authRoutes:', authRoutes);
// console.log('invoiceRoutes:', invoiceRoutes);
// console.log('aiRoutes:', aiRoutes);
// console.log("Gemini Key:", process.env.GEMINI_API_KEY);

// Routes Here
app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/ai", aiRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
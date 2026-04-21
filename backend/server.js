const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tax", require("./routes/taxRoutes"));
app.use("/api/invoice", require("./routes/invoiceRoutes"));
app.use("/api/risk", require("./routes/riskRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
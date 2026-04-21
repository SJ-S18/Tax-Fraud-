const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { fileTax, getMyTaxes } = require("../controllers/taxController");

// File tax
router.post("/file", authMiddleware, fileTax);

// Get my tax history
router.get("/my", authMiddleware, getMyTaxes);

module.exports = router;
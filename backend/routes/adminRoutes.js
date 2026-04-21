const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAllTaxRecords,
  getAllInvoices,
  getSuspiciousFilings,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin Routes
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/tax", authMiddleware, adminMiddleware, getAllTaxRecords);
router.get("/invoices", authMiddleware, adminMiddleware, getAllInvoices);
router.get("/suspicious", authMiddleware, adminMiddleware, getSuspiciousFilings);

module.exports = router;
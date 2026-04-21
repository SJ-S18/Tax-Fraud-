const User = require("../models/User");
const Tax = require("../models/Tax");
const Invoice = require("../models/Invoice");
const axios = require("axios");

// ===============================
// GET ALL USERS
// ===============================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.log("Get Users Error:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// ===============================
// GET ALL TAX RECORDS
// ===============================
exports.getAllTaxRecords = async (req, res) => {
  try {
    const taxes = await Tax.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(taxes);
  } catch (error) {
    console.log("Get Tax Records Error:", error);
    res.status(500).json({ message: "Error fetching tax records" });
  }
};

// ===============================
// GET ALL INVOICES
// ===============================
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    console.log("Get Invoices Error:", error);
    res.status(500).json({ message: "Error fetching invoices" });
  }
};

// ===============================
// GET AI SUSPICIOUS FILINGS
// ===============================
exports.getSuspiciousFilings = async (req, res) => {
  try {
    const taxes = await Tax.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    const suspiciousList = [];

    for (const tax of taxes) {
      const totalFilings = await Tax.countDocuments({ userId: tax.userId?._id });

      let previousAudit = 0;
      if ((tax.income || 0) > 1000000 && (tax.taxPaid || 0) < 50000) {
        previousAudit = 1;
      }

      try {
        const response = await axios.post("http://localhost:5001/predict", {
          income: tax.income || 0,
          deductions: tax.deductions || 0,
          filing_history: totalFilings,
          previous_audit: previousAudit,
          tax_paid: tax.taxPaid || 0,
        });

        const result = response.data;

        // ✅ FIXED: use riskScore instead of score
        // Show only Medium Risk and High Risk users
        if (result.riskScore >= 40) {
          suspiciousList.push({
            name: tax.userId?.name || "Unknown",
            email: tax.userId?.email || "N/A",
            income: tax.income || 0,
            deductions: tax.deductions || 0,
            taxPaid: tax.taxPaid || 0,
            score: result.riskScore || 0,
            riskLevel: result.riskLevel || "Low",
            fraudResult: result.fraudResult || "SAFE",
            createdAt: tax.createdAt,
          });
        }
      } catch (aiError) {
        console.log("AI Prediction Error:", aiError.message);
      }
    }

    res.json(suspiciousList);
  } catch (error) {
    console.log("Suspicious Filings Error:", error);
    res.status(500).json({ message: "Error fetching suspicious filings" });
  }
};
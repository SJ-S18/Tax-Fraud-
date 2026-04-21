const axios = require("axios");
const Tax = require("../models/Tax");

exports.getRiskScore = async (req, res) => {
  try {
    const userId = req.user.id;

    const tax = await Tax.findOne({ userId }).sort({ createdAt: -1 });

    if (!tax) {
      return res.status(404).json({ error: "No tax filing found" });
    }

    const aiResponse = await axios.post("http://127.0.0.1:5001/predict", {
      income: tax.income,
      deductions: tax.deductions,
      tax_paid: tax.taxPaid,
      filing_history: 1,
      previous_audit: 0,
    });

    res.status(200).json({
      latestTax: tax,
      ...aiResponse.data,
    });
  } catch (error) {
    console.error("Risk score error:", error.message);
    res.status(500).json({ error: "Error in AI fraud detection" });
  }
};
const Tax = require("../models/Tax");

// File Tax
const fileTax = async (req, res) => {
  try {
    const { income, deductions, taxPaid, expectedTax } = req.body;

    const tax = await Tax.create({
      userId: req.user.id,
      income,
      deductions,
      taxPaid,
      expectedTax,
    });

    res.status(201).json({
      message: "Tax filed successfully",
      tax,
    });
  } catch (error) {
    console.error("Tax filing error:", error);
    res.status(500).json({ message: "Server error while filing tax" });
  }
};

// Get My Tax History
const getMyTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(taxes);
  } catch (error) {
    console.error("Get tax history error:", error);
    res.status(500).json({ message: "Server error while fetching tax history" });
  }
};

module.exports = {
  fileTax,
  getMyTaxes,
};
const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    deductions: {
      type: Number,
      required: true,
    },
    taxPaid: {
      type: Number,
      required: true,
    },
    expectedTax: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tax", taxSchema);
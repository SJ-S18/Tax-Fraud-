const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  invoiceNumber: {
    type: String,
    required: true
  },
  sellerGST: {
    type: String,
    required: true
  },
  buyerGST: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  isDuplicate: {
    type: Boolean,
    default: false
  },
  isValidGST: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
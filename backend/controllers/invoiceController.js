const Invoice = require("../models/Invoice");

// GST Validation Function
const isValidGSTNumber = (gst) => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst);
};

// Create Invoice
exports.createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, sellerGST, buyerGST, amount } = req.body;

    // Check duplicate invoice
    const existingInvoice = await Invoice.findOne({ invoiceNumber });

    const duplicate = existingInvoice ? true : false;

    // Validate GST
    const validSellerGST = isValidGSTNumber(sellerGST);
    const validBuyerGST = isValidGSTNumber(buyerGST);

    const invoice = await Invoice.create({
      userId: req.user.id,
      invoiceNumber,
      sellerGST,
      buyerGST,
      amount,
      isDuplicate: duplicate,
      isValidGST: validSellerGST && validBuyerGST
    });

    res.json({
      message: "Invoice Submitted Successfully",
      invoice
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User Invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.id });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
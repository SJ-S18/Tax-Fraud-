const router = require("express").Router();
const { createInvoice, getInvoices } = require("../controllers/invoiceController");
const auth = require("../middleware/authMiddleware");

router.post("/create", auth, createInvoice);
router.get("/my", auth, getInvoices);

module.exports = router;
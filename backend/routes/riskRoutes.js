const router = require("express").Router();
const { getRiskScore } = require("../controllers/riskController");
const auth = require("../middleware/authMiddleware");

router.get("/my", auth, getRiskScore);

module.exports = router;
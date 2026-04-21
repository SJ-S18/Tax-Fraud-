const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { updateProfile } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.put("/update", auth, updateProfile);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
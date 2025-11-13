const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { parseInvoiceFromText, generateReminderEmail, getDashboardSummary } = require("../controllers/aiController");

const router = express.Router();

router.post("/parse-text", protect, parseInvoiceFromText);
router.post("/generate-reminder", protect, generateReminderEmail);
router.get("/dashboard-summary", protect, getDashboardSummary);

module.exports = router;
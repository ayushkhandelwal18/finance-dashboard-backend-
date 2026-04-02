const express = require("express");
const {
  getSummary,
  getCategoryDistribution,
  getTrends,
  getRecentTransactions,
} = require("../controllers/dashboard.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(protect);
router.use(authorize("analyst", "admin"));

router.get("/summary", getSummary);
router.get("/category", getCategoryDistribution);
router.get("/trends", getTrends);
router.get("/recent", getRecentTransactions);

module.exports = router;

const Record = require("../models/record.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getSummary = asyncHandler(async (req, res) => {
  const summary = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  summary.forEach((item) => {
    if (item._id === "income") totalIncome = item.total;
    if (item._id === "expense") totalExpense = item.total;
  });

  const netBalance = totalIncome - totalExpense;

  return res.status(200).json(
    new ApiResponse(200, { totalIncome, totalExpense, netBalance }, "Summary retrieved successfully")
  );
});

const getCategoryDistribution = asyncHandler(async (req, res) => {
  const distribution = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
      },
    },
    { $sort: { totalAmount: -1 } },
  ]);

  return res.status(200).json(
    new ApiResponse(200, { categories: distribution }, "Category distribution retrieved successfully")
  );
});

const getTrends = asyncHandler(async (req, res) => {
  const trends = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const formattedTrends = trends.reduce((acc, curr) => {
    const period = `${curr._id.year}-${String(curr._id.month).padStart(2, "0")}`;
    if (!acc[period]) {
      acc[period] = { income: 0, expense: 0 };
    }
    acc[period][curr._id.type] = curr.total;
    return acc;
  }, {});

  return res.status(200).json(
    new ApiResponse(200, { trends: formattedTrends }, "Trends retrieved successfully")
  );
});

const getRecentTransactions = asyncHandler(async (req, res) => {
  const recent = await Record.find({ isDeleted: false })
    .sort({ date: -1 })
    .limit(5)
    .populate("createdBy", "name email");

  return res.status(200).json(
    new ApiResponse(200, { recent }, "Recent transactions retrieved successfully")
  );
});

module.exports = {
  getSummary,
  getCategoryDistribution,
  getTrends,
  getRecentTransactions,
};

const Record = require("../models/record.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createRecord = asyncHandler(async (req, res) => {
  const { amount, type, category, date, notes } = req.body;

  if (amount === undefined || !type || !category || !date) {
    throw new ApiError(400, "Please provide amount, type, category, and date");
  }

  const record = await Record.create({
    amount,
    type,
    category,
    date,
    notes,
    createdBy: req.user._id,
  });

  return res.status(201).json(new ApiResponse(201, { record }, "Record created successfully"));
});

const getRecords = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, type, category, startDate, endDate } = req.query;

  const query = { isDeleted: false };

  if (type) query.type = type;
  if (category) query.category = category;
  
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const records = await Record.find(query)
    .populate("createdBy", "name email role")
    .sort({ date: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Record.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        records,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
      "Records retrieved successfully"
    )
  );
});

const updateRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const record = await Record.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true, runValidators: true }
  );

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return res.status(200).json(new ApiResponse(200, { record }, "Record updated successfully"));
});

const deleteRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const record = await Record.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Record deleted successfully"));
});

module.exports = { createRecord, getRecords, updateRecord, deleteRecord };

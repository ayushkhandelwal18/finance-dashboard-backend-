const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  return res.status(200).json(new ApiResponse(200, { users }, "Users retrieved successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role, isActive } = req.body;

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (role !== undefined) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;

  await user.save();

  const userObject = user.toObject();
  delete userObject.password;

  return res.status(200).json(new ApiResponse(200, { user: userObject }, "User updated successfully"));
});

module.exports = { getUsers, updateUser };

const express = require("express");
const { getUsers, updateUser } = require("../controllers/user.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/", getUsers);
router.patch("/:id", updateUser);

module.exports = router;

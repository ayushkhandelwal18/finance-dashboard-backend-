const express = require("express");
const { createRecord, getRecords, updateRecord, deleteRecord } = require("../controllers/record.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(protect);

router.get("/", getRecords);

router.post("/", authorize("admin"), createRecord);
router.patch("/:id", authorize("admin"), updateRecord);
router.delete("/:id", authorize("admin"), deleteRecord);

module.exports = router;

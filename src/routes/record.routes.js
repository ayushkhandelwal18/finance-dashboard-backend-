const express = require("express");
const { createRecord, getRecords, updateRecord, deleteRecord } = require("../controllers/record.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { createRecordSchema, updateRecordSchema } = require("../validations/record.validation");

const router = express.Router();

router.use(protect);

router.get("/", getRecords);

router.post("/", authorize("admin"), validate(createRecordSchema), createRecord);
router.patch("/:id", authorize("admin"), validate(updateRecordSchema), updateRecord);
router.delete("/:id", authorize("admin"), deleteRecord);

module.exports = router;

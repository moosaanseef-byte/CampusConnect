const express = require("express");

const {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
} = require("../controllers/opportunitycontroller");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getOpportunities);
router.get("/:id", getOpportunityById);

router.post("/", protect, adminOnly, createOpportunity);
router.put("/:id", protect, adminOnly, updateOpportunity);
router.delete("/:id", protect, adminOnly, deleteOpportunity);

module.exports = router;
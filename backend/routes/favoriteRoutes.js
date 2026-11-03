const express = require("express");

const {
  getFavorites,
  addFavorite,
  removeFavorite
} = require("../controllers/favoritecontroller");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getFavorites);
router.post("/:opportunityId", protect, addFavorite);
router.delete("/:opportunityId", protect, removeFavorite);

module.exports = router;
const express = require("express");

const {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  getBrand,
  uploadBrandImage,
  resizeBrandImage,
} = require("../controllers/brand");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brand");
const { protect, allowedTo } = require("../controllers/auth");

const router = express.Router();

router
  .route("/")
  .post(
    protect,
    allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeBrandImage,
    createBrandValidator,
    createBrand
  )
  .get(getBrands);
router
  .route("/:id")
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeBrandImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(protect, allowedTo("admin"), deleteBrandValidator, deleteBrand)
  .get(getBrandValidator, getBrand);

module.exports = router;

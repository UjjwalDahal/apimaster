const express = require("express");
const courseRouter = require("./courses");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

// re-routing router on resource

router.use("/:bootcampId/courses", courseRouter);

const {
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  getBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);
module.exports = router;

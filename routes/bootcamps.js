const express = require("express");
const courseRouter = require("./courses");
const router = express.Router();
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
  .post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route("/:id/photo").put(bootcampPhotoUpload);
module.exports = router;

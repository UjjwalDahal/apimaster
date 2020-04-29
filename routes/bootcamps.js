const express = require('express');
const courseRouter = require('./courses');
const router = express.Router();

// re-routing router on resource

router.use('/:bootcampId/courses', courseRouter);

const {
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  getBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;

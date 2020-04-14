// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    msg: 'Get all bootcamps',
  });
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    msg: 'Get single bootcamp',
  });
};

// @desc    Create new  bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    msg: 'Create a bootcamp',
  });
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    msg: 'Update a bootcamp',
  });
};

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    msg: 'Delete a bootcamp',
  });
};

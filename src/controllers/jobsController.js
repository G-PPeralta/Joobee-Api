const Job = require('../models/jobs');
const geocoder = require('../utils/geocoder');

// Get all jobs => /api/v1/jobs
exports.getJobs = async (req, res, next) => {
  const jobs = await Job.find();

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs
  });
}


exports.newJob = async (req, res, next) => {
  const job = await Job.create(req.body);
  res.status(200).json({
    success: true,
    message: 'New job created',
    data: job
  });
};

// Search Jobs with radius => /api/v1/jobs/:zipcode/:distance

exports.getJobsInRadius = async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide distance by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const jobs = await Job.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs
  });
};
const Job = require('../models/jobs');

// Get all jobs => /api/v1/jobs
exports.getJobs = (req, res, next) => {
  res.status(200).json({
    success: true,
    middleware: req.user,
    msg: 'Show all jobs'
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
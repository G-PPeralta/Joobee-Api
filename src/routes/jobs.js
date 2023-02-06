const express = require('express');
const router = express.Router();

// Importing jobs controller methods

const { getJobs, newJob, getJobsInRadius, updateJob, deleteJob, getJob } = require('../controllers/jobsController');

//Get
router.route('/jobs').get(getJobs);
router.route('/jobs/:id').get(getJob);
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);

//Post
router.route('/jobs/new').post(newJob);

//Put
router.route('/jobs/:id').put(updateJob);

//Delete
router.route('/jobs/:id').delete(deleteJob);


module.exports = router;

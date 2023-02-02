const express = require('express');
const router = express.Router();


// @route   GET api/jobs
// @desc    Get all users jobs

router.get('/jobs', (req, res) => {
  return res.status(200).json({
    success: true, 
    msg: 'Show all jobs'
  });
});



module.exports = router;



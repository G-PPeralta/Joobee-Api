const mongoose = require('mongoose');
const validator = require('validator');
const slugifigy = require('slugify');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter job title'],
    trim: true,
    maxlength: [100, 'Job title cannot exceed 100 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please enter job description'],
    maxlength: [1000, 'Job description cannot exceed 1000 characters']
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Please enter valid email']
  },
  address: {
    type: String,
    required: [true, 'Please enter job address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  company: {
    type: String,
    required: [true, 'Please enter company name']
  },
  industry: {
    type: [String],
    required: [true],
    enum: {
      values: [
        'Business & Professional Services',
        'Information Technology',
        'Banking & Financial Services',
        'Telecommunications',
        'Other'
      ],
      message: 'Please select correct options for industry'
    }
  },
  jobType: {
    type: String,
    required: true,
    enum: {
      values: [
        'Permanent',
        'Temporary',
        'Internship',
      ],
      message: 'Please select correct options for job type'
    }
  },
  minEducation: {
    type: String,
    required: true,
    enum: {
      values: [
        'Bachelors',
        'Masters',
        'PhD'
      ],
      message: 'Please select correct options for minimum education'
    }
  },
  positions: {
    type: Number,
    default: 1
  },
  experience: {
    type: String,
    required: true,
    enum: {
      values: [
        'No Experience',
        '1-2 Years',
        '2-5 Years',
      ],
      message: 'Please select correct options for experience'
    },
  },
  salary: {
    type: Number,
    required: [true, 'Please enter salary amount']
  },
  postingDate: {
    type: Date,
    default: Date.now
  },
  lastDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7),
  },
  applicantsApplied: {
    type: [Object],
    select: false
  },
});

// Creating job slug before saving to database

jobSchema.pre('save', function (next) {
  this.slug = slugifigy(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Job', jobSchema);

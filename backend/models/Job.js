import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      trim: true
    },
    logo: {
      type: String,
      default: '🏢'
    },
    description: {
      type: String,
      required: true
    },
    responsibilities: {
      type: [String],
      default: []
    },
    requirements: {
      type: [String],
      default: []
    },
    industry: {
      type: String,
      default: 'it'
    },
    industryName: {
      type: String,
      default: 'Information Technology'
    },
    roleCategory: {
      type: String,
      default: 'Software Developer'
    },
    location: {
      type: String,
      required: true,
      default: 'Vadodara, Gujarat'
    },
    qualification: {
      type: String,
      default: 'B.Tech / B.E / BCA / MCA'
    },
    experience: {
      type: String,
      default: 'Fresher'
    },
    skills: {
      type: [String],
      default: []
    },
    salary: {
      type: String,
      default: '₹3 - ₹5 LPA'
    },
    salaryMin: {
      type: Number,
      default: 3
    },
    salaryMax: {
      type: Number,
      default: 5
    },
    jobType: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Internship', 'Remote', 'Hybrid'],
      default: 'Full Time'
    },
    applyUrl: {
      type: String,
      default: ''
    },
    postedDate: {
      type: String,
      default: 'Just now'
    },
    deadline: {
      type: Date
    },
    status: {
      type: String,
      enum: ['active', 'closed'],
      default: 'active'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;

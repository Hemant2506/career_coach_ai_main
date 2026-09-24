import mongoose from 'mongoose';

const roadmapStepSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true }
});

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a career title'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      default: 'Engineering'
    },
    description: {
      type: String,
      required: [true, 'Please provide a description']
    },
    overview: {
      type: String,
      default: ''
    },
    responsibilities: {
      type: [String],
      default: []
    },
    requiredSkills: {
      type: [String],
      default: []
    },
    preferredQualification: {
      type: String,
      default: 'B.Tech / B.E / BCA / MCA / B.Sc'
    },
    industries: {
      type: [String],
      default: ['Information Technology']
    },
    roadmap: [roadmapStepSchema],
    averageSalary: {
      type: String,
      default: '₹4.5 - ₹16 LPA'
    },
    popularLocations: {
      type: [String],
      default: ['Vadodara', 'Bengaluru', 'Pune', 'Hyderabad']
    },
    recommendedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    recommendedCourseSlugs: {
      type: [String],
      default: []
    },
    matchScore: {
      type: Number,
      default: 90
    }
  },
  {
    timestamps: true
  }
);

const Career = mongoose.model('Career', careerSchema);
export default Career;

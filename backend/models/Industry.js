import mongoose from 'mongoose';

const industrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide an industry name'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    overview: {
      type: String,
      default: ''
    },
    popularRoles: {
      type: [String],
      default: []
    },
    requiredSkills: {
      type: [String],
      default: []
    },
    popularLocations: {
      type: [String],
      default: ['Vadodara', 'Bengaluru', 'Mumbai', 'Pune', 'Hyderabad']
    },
    companies: {
      type: [String],
      default: []
    },
    marketGrowth: {
      type: String,
      default: '+15% Annual Growth'
    },
    icon: {
      type: String,
      default: 'Building2'
    },
    jobRolesCount: {
      type: Number,
      default: 20
    }
  },
  {
    timestamps: true
  }
);

const Industry = mongoose.model('Industry', industrySchema);
export default Industry;

import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a skill name'],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      default: 'Core'
    },
    description: {
      type: String,
      default: ''
    },
    demandLevel: {
      type: String,
      enum: ['High', 'Very High', 'Medium', 'Growing'],
      default: 'High'
    },
    relatedCareers: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;

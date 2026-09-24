import mongoose from 'mongoose';

const assessmentQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true }, // Index 0..3
  explanation: { type: String, default: '' },
  skill: { type: String, default: 'General' },
  topic: { type: String, default: 'Core' }
});

const assessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an assessment title'],
      trim: true
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      default: 'Programming'
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate'
    },
    duration: {
      type: Number, // In minutes
      default: 20
    },
    questions: [assessmentQuestionSchema],
    strongTopicsPool: {
      type: [String],
      default: []
    },
    weakTopicsPool: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment;

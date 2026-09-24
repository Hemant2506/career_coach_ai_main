import mongoose from 'mongoose';

const interviewQuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Please provide an interview category'],
      default: 'Software Developer'
    },
    text: {
      type: String,
      required: [true, 'Please provide the question prompt'],
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Easy', 'Medium', 'Hard'],
      default: 'Intermediate'
    },
    expectedKeywords: {
      type: [String],
      default: []
    },
    modelAnswer: {
      type: String,
      required: true
    },
    evaluationCriteria: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const InterviewQuestion = mongoose.model('InterviewQuestion', interviewQuestionSchema);
export default InterviewQuestion;

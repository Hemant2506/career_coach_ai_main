import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  questionText: { type: String, required: true },
  text: { type: String, default: '' },
  evaluation: {
    score: { type: Number, default: 0 },
    relevance: { type: Number, default: 0 },
    technicalKnowledge: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
    grammar: { type: Number, default: 0 },
    completeness: { type: Number, default: 0 },
    strengths: { type: [String], default: [] },
    improvements: { type: [String], default: [] },
    sampleAnswer: { type: String, default: '' }
  }
});

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      required: true,
      default: 'Software Developer'
    },
    difficulty: {
      type: String,
      default: 'Intermediate'
    },
    numberOfQuestions: {
      type: Number,
      default: 5
    },
    answerMode: {
      type: String,
      enum: ['text', 'voice'],
      default: 'text'
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress'
    },
    questions: [
      {
        questionId: String,
        text: String,
        category: String,
        difficulty: String,
        expectedKeywords: [String],
        modelAnswer: String
      }
    ],
    answers: [answerSchema],
    result: {
      totalScore: { type: Number, default: 0 },
      technicalScore: { type: Number, default: 0 },
      communicationScore: { type: Number, default: 0 },
      relevanceScore: { type: Number, default: 0 },
      grammarScore: { type: Number, default: 0 },
      completenessScore: { type: Number, default: 0 },
      strengths: { type: [String], default: [] },
      weaknesses: { type: [String], default: [] },
      recommendations: { type: Array, default: [] },
      sampleAnswers: { type: [String], default: [] },
      date: { type: String, default: '' }
    },
    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;

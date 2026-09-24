import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  videoUrl: {
    type: String,
    default: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  duration: { type: String, default: '20 min' },
  order: { type: Number, default: 1 },
  keyTakeaways: { type: [String], default: [] },
  resources: { type: [String], default: [] }
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
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
    category: {
      type: String,
      required: true,
      default: 'Programming'
    },
    instructor: {
      type: String,
      default: 'Staff Instructor'
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
      default: 'Beginner'
    },
    duration: {
      type: String,
      default: '5 Hours'
    },
    thumbnail: {
      type: String,
      default: ''
    },
    skills: {
      type: [String],
      default: []
    },
    whatYoullLearn: {
      type: [String],
      default: []
    },
    totalLessons: {
      type: Number,
      default: 10
    },
    rating: {
      type: Number,
      default: 4.8
    },
    lectures: [lectureSchema],
    quizzes: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;

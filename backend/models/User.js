import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    phone: {
      type: String,
      default: ''
    },
    education: {
      type: String,
      default: 'B.Tech in Computer Science & Engineering'
    },
    qualification: {
      type: String,
      default: 'Undergraduate'
    },
    graduationYear: {
      type: String,
      default: '2026'
    },
    skills: {
      type: [String],
      default: ['Java', 'SQL', 'JavaScript', 'React', 'Git']
    },
    preferredIndustry: {
      type: String,
      default: 'Information Technology'
    },
    preferredLocation: {
      type: String,
      default: 'Vadodara, Gujarat'
    },
    careerGoal: {
      type: String,
      default: 'Software Developer'
    },
    bio: {
      type: String,
      default: 'Aspiring software developer preparing for campus placements and technical interviews.'
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student'
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
      }
    ]
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  name: String,
  suggestedSemester: Number,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career' }
})

const Subject = mongoose.model('Subject', commentSchema)

export default Subject
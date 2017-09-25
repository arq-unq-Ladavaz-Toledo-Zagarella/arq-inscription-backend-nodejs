import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  name: String,
  quota: Number,
  days: [ String ],
  startTime: String,
  endTime: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }
})

const Course = mongoose.model('Course', commentSchema)

export default Course
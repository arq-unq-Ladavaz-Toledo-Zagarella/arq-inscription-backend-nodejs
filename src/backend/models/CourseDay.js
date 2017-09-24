import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  startsAt: { type: Date, default: Date.now },
  endsAt: { type: Date, default: Date.now },
})

const CourseDay = mongoose.model('CourseDay', commentSchema)

export default CourseDay
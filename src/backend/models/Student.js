import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  name: String,
  studentId: Number
})

const Student = mongoose.model('Student', commentSchema)

export default Student
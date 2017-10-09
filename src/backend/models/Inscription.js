import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  studentId: Number
})

const Inscription = mongoose.model('Inscription', commentSchema)

export default Inscription
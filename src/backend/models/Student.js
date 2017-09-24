import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  name: String,
  studentId: Number,
  careers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Career' }],
  approvedSubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
})

const Student = mongoose.model('Student', commentSchema)

export default Student
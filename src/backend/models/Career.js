import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  name: String,
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
})

const Career = mongoose.model('Career', commentSchema)

export default Career
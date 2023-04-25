import mongoose from 'mongoose'

require('./User')

const teacherSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: false },
  status: { type: Boolean, required: true, default: true, select: false },
  created: { type: Date, default: Date.now, select: false },
  modified: { type: Date, default: Date.now, select: false }
}, { toJSON: { virtuals: true } })

export default mongoose.model<any>('Teacher', teacherSchema, 'teachers')

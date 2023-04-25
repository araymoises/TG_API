import mongoose from 'mongoose'

require('./Teacher')
require('./Content')

const classroomSchema = new mongoose.Schema({
  teacher: { type: mongoose.Types.ObjectId, ref: 'Teacher', required: true },
  name: { type: String, required: true, mminlength: 1, maxlength: 3 },
  description: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
}, { toJSON: { virtuals: true } })

classroomSchema.virtual('students',
  {
    ref: "Student",
    localField: "_id",
    foreignField: "classroom",
    justOne: false
  }
)

classroomSchema.virtual('content',
  {
    ref: "Content",
    localField: "_id",
    foreignField: "classroom",
    justOne: true
  }
)

export default mongoose.model<any>('Classroom', classroomSchema, 'classrooms')

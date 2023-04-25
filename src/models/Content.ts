import mongoose from 'mongoose'

require('./Classroom')
require('./Activity')

const contentSchema = new mongoose.Schema({
  classroom: { type: mongoose.Types.ObjectId, ref: 'Classroom', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
}, { toJSON: { virtuals: true } })

contentSchema.virtual('activities',
  {
    ref: "Activity",
    localField: "_id",
    foreignField: "content",
    justOne: false
  }
)

export default mongoose.model<any>('Content', contentSchema, 'contents')

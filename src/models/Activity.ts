import mongoose from 'mongoose'

require('./Content')
require('./ActivityType')
require('./Object')
require('./Answer')
require('./Qualification')

const activitySchema = new mongoose.Schema({
  content: { type: mongoose.Types.ObjectId, ref: 'Content', required: true },
  activityType: { type: mongoose.Types.ObjectId, ref: 'ActivityType', required: true },
  object: { type: mongoose.Types.ObjectId, ref: 'Object', required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  question: { type: String, required: true },
  max_qualification: { type: Number, required: true },
  startDate: { type: Date, required: true },
  finishDate: { type: Date, required: true },
  status: { type: Boolean, required: true, default: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
}, { toJSON: { virtuals: true } })

activitySchema.virtual('answers',
  {
    ref: "Answer",
    localField: "_id",
    foreignField: "activity",
    justOne: false
  }
)

activitySchema.virtual('qualifications',
  {
    ref: "Qualification",
    localField: "_id",
    foreignField: "activity",
    justOne: false
  }
)

export default mongoose.model<any>('Activity', activitySchema, 'activities')

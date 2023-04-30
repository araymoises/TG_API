import mongoose from 'mongoose'

const objectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  sourcePath: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  scale: { type: String, required: true },
  position: { type: String, required: true },
  rotationPivot: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
}, { toJSON: { virtuals: true } })

objectSchema.virtual('resources',
  {
    ref: "Resource",
    localField: "_id",
    foreignField: "object",
    justOne: false
  }
)

export default mongoose.model<any>('Object', objectSchema, 'objects')

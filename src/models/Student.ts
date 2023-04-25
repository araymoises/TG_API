import mongoose from 'mongoose'

require('./Classroom')
require('./Qualification')
require('./User')

const studentSchema = new mongoose.Schema({
    classroom: {type: mongoose.Types.ObjectId, ref: 'Classroom', required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    email: {type: String, required: true, unique: true, lowercase: true},
    confirmed: {type: Boolean, required: true, default: false},
    accessCode: {type: String, required: false},
    status: {type: Boolean, required: true, default: true},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true } })

studentSchema.virtual('qualifications',
  {
    ref: "Qualification",
    localField: "_id",
    foreignField: "student",
    justOne: false
  }
)

export default mongoose.model<any>('Student', studentSchema, 'students')

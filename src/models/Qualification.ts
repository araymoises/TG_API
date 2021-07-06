
import mongoose from 'mongoose'

require('./Activity')
require('./Student')

const qualificationSchema = new mongoose.Schema({
    activity: {type: mongoose.Types.ObjectId, ref: 'Activity', required: true},
    student: {type: mongoose.Types.ObjectId, ref: 'Student', required: true},
    qualification: {type: Number, required: true},
    status: {type: Boolean, required: true, default: true},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true } })

export default mongoose.model<any>('Qualification', qualificationSchema, 'qualifications')
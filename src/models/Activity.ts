import mongoose from 'mongoose'

require('./Classroom')

const activitySchema = new mongoose.Schema({
    classroom: {type: mongoose.Types.ObjectId, ref: 'Classroom', required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    max_qualification: {type: Number, required: true},
    status: {type: Boolean, required: true, default: true},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true } })

export default mongoose.model<any>('Activity', activitySchema, 'activities')
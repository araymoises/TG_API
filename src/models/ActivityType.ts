import mongoose from 'mongoose'

const activityTypeSchema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    status: {type: Boolean, required: true, default: true},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true } })

export default mongoose.model<any>('ActivityType', activityTypeSchema, 'activity_types')
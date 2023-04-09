import mongoose from 'mongoose'

require('./Content')
require('./ActivityType')

const activitySchema = new mongoose.Schema({
    content: {type: mongoose.Types.ObjectId, ref: 'Content', required: true},
    activityType: {type: mongoose.Types.ObjectId, ref: 'ActivityType', required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    max_qualification: {type: Number, required: true},
    status: {type: Boolean, required: true, default: true},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true } })

export default mongoose.model<any>('Activity', activitySchema, 'activities')
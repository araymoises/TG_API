import mongoose from 'mongoose'

require('./Object')

const resourceSchema = new mongoose.Schema({
    object: {type: mongoose.Types.ObjectId, ref: 'Object', required: true},
    path: {type: String, required: true},
    status: {type: Boolean, required: true, default: true},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true } })

export default mongoose.model<any>('Resource', resourceSchema, 'resources')

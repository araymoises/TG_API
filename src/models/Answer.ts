import mongoose from 'mongoose'

require('./Activity')

const answerSchema = new mongoose.Schema({
    activity: {type: mongoose.Types.ObjectId, ref: 'Activity', required: true},
    title: {type: String, required: true},
    isCorrect: {type: Boolean, required: true},
    status: {type: Boolean, required: true, default: true},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true } })

export default mongoose.model<any>('Answer', answerSchema, 'answers')
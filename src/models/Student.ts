import mongoose from 'mongoose'

require('./Classroom')

const studentSchema = new mongoose.Schema({
    classroom: {type: mongoose.Types.ObjectId, ref: 'Classroom', required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    confirmed: {type: Boolean, required: true, default: false},
    accessCode: {type: String, required: false},
    status: {type: Boolean, required: true, default: true},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true } })

export default mongoose.model<any>('Student', studentSchema, 'students')
import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: false},
    status: {type: Boolean, required: true, default: true},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true } })

export default mongoose.model<any>('Teacher', teacherSchema, 'teachers')
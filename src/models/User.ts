import mongoose from 'mongoose'
// import { IActivity } from '../interfaces/IActivity';

// require('./InstrumentType');
// require('./EvaluationType');
// require('./Objective');
// require('./Indicator');
// require('./Unit');
// require('./Planning');
// require('./Person');
// require('./Institution');
// require('./Course');
// require('./Resource');
// require('./DuaRecommendedActivity');

// require('./ActivityMessage');

// const progressStatusSchema = new mongoose.Schema({
//     isStarted: {type: Boolean, default: false},
//     startDate: {type: Date, required: false},
//     starter: {type: mongoose.Types.ObjectId, ref: 'Person', required: false},

// 	isFinished: {type: Boolean, default: false},
//     finishDate: {type: Date, required: false},
// 	finisher: {type: mongoose.Types.ObjectId, ref: 'Person', required: false},

// 	isChecked: {type: Boolean, default: false},
//     checkDate: {type: Date, required: false},
//     checker: {type: mongoose.Types.ObjectId, ref: 'Person', required: false},
// 	checkResoult: {type: Boolean, default: false},

// 	status: {type: String, enum: ['NOT_STARTED', 'STARTED', 'FINISHED', 'CHECKED'], default: 'NOT_STARTED', required: false},
// });

// const teacherSchema = new mongoose.Schema({
//     firstname: {type: String, required: true},
//     lastname: {type: String, required: true},
//     email: {type: String, required: true},
//     phone: {type: String, required: false},
//     status: {type: Boolean, required: true, default: true},
//     created: {type: Date, default: Date.now},
//     modified: {type: Date, default: Date.now}
// })

// const ownResource = new mongoose.Schema({
// 	name: {type: String, required: true},
// 	description: {type: String, required: true},
// 	link: {type: String, required: false},
// });

require('./Teacher')
require('./Student')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  status: { type: Boolean, required: true, default: true, select: false },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
}, { toJSON: { virtuals: true } })

userSchema.virtual('teacher',
	{
		ref: "Teacher",
		localField: "_id",
		foreignField: "user",
		justOne: true
	}
)

userSchema.virtual('student',
	{
		ref: "Student",
		localField: "_id",
		foreignField: "user",
		justOne: true
	}
)

// export default mongoose.model<IActivity>('User', userSchema, 'users');
export default mongoose.model<any>('User', userSchema, 'users')

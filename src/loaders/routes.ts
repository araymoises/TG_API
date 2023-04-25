import { Router } from 'express'

import authRouter from '../api/auth/auth.router'
import classroomRouter from '../api/classroom/classroom.router'
import studentRouter from '../api/student/student.router'
import contentRouter from '../api/content/content.router'
import qualificationtRouter from '../api/qualification/qualification.router'
import objectRouter from '../api/object/object.router'
import activityRouter from '../api/activity/activity.router'
import activityTypeRouter from '../api/activityType/activityType.router'
import answerRouter from '../api/answer/answer.router'
import isAuth from '../middlewares/isAuth';

export default () => {
	const router = Router()
	router.use('/auth', authRouter)
	router.use('/classrooms', isAuth, classroomRouter)
	router.use('/students', isAuth, studentRouter)
	router.use('/qualifications', isAuth, qualificationtRouter)
	router.use('/contents', isAuth, contentRouter)
	router.use('/objects', isAuth, objectRouter)
	router.use('/activities', isAuth, activityRouter)
	router.use('/activity-types', isAuth, activityTypeRouter)
	router.use('/answers', isAuth, answerRouter)

  return router
};

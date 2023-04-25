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
import statisticRouter from '../api/statistic/statistic.router'
import isAuth from '../middlewares/isAuth'
import studentsCantChangeDB from '../middlewares/studentsCantChangeDB'

export default () => {
	const router = Router()
	router.use('/auth', authRouter)
	router.use('/classrooms', isAuth, studentsCantChangeDB, classroomRouter)
	router.use('/students', isAuth, studentRouter)
	router.use('/qualifications', isAuth, qualificationtRouter)
	router.use('/contents', isAuth, studentsCantChangeDB, contentRouter)
	router.use('/objects', isAuth, studentsCantChangeDB, objectRouter)
	router.use('/activities', isAuth, studentsCantChangeDB, activityRouter)
	router.use('/activity-types', isAuth, studentsCantChangeDB, activityTypeRouter)
	router.use('/answers', isAuth, studentsCantChangeDB, answerRouter)
	router.use('/statistics', isAuth, statisticRouter)

  return router
};

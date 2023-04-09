import { Router } from 'express'

import authRouter from '../api/auth/auth.router'
import classroomRouter from '../api/classroom/classroom.router'
import studentRouter from '../api/student/student.router'
import isAuth from '../middlewares/isAuth';

export default () => {
	const router = Router()
	router.use('/auth', authRouter)
	router.use('/classrooms', isAuth, classroomRouter)
	router.use('/students', isAuth, studentRouter)

    return router
};

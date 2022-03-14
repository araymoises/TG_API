import { Router } from 'express'

import authRouter from '../api/auth/auth.router'
import classroomRouter from '../api/classroom/classroom.router'
import isAuth from '../middlewares/isAuth';

export default () => {
	const router = Router()
	router.use('/auth', authRouter)
	router.use('/classrooms', isAuth, classroomRouter)

    return router
};

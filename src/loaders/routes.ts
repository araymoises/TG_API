import { Router } from 'express'

import authRouter from '../api/auth/auth.router'

export default () => {
	const router = Router()
	router.use('/auth', authRouter)

    return router
};

import { Router } from 'express'

import getFees from '../api/fees/fees.router'

export default () => {
	const router = Router()
	router.use('/obtener/tarifas/carriers', getFees)

    return router
};

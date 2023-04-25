import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getActivitiesStatus, getBestQualificationsAverage, getQualificationAverageByActivity } from './statistic.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/activities-status/classroom/:classroom', getActivitiesStatus)
router.get('/best-qualifications-average/classroom/:classroom', getBestQualificationsAverage)
router.get('/qualification-average-by-activity/classroom/:classroom', getQualificationAverageByActivity)

export default router

import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getActivities, getActivityById, saveActivity, updateActivityById, deleteActivity } from './activity.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/classroom/:classroom', getActivities)
router.post('/save', saveActivity)
router.patch('/update/:id', updateActivityById)
router.delete('/delete/:id', deleteActivity)
router.get('/:id', getActivityById)

export default router

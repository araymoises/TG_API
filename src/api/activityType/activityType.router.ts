import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getActivityTypes, getActivityTypeById, saveActivityType, updateActivityTypeById, deleteActivityType } from './activityType.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/', getActivityTypes)
router.post('/save', saveActivityType)
router.patch('/update/:id', updateActivityTypeById)
router.delete('/delete/:id', deleteActivityType)
router.get('/:id', getActivityTypeById)

export default router

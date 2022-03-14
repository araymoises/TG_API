import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getClassrooms, saveClassroom } from './classroom.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/', getClassrooms)
router.post('/save', saveClassroom)

export default router
import {Router} from 'express'
import validate from '../../middlewares/validate'
import { login, teacherSignup, studentSignup } from './auth.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.post('/login', login)
router.post('/teachers/signup', teacherSignup)
router.post('/students/signup', studentSignup)

export default router

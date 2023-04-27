import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getTeacherById, updateTeacherById, deleteTeacher } from './teacher.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.patch('/update/:id', updateTeacherById)
router.delete('/delete/:id', deleteTeacher)
router.get('/:id', getTeacherById)

export default router

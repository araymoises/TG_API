import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getClassrooms, getClassroomById, saveClassroom, updateClassroomById, deleteClassroom } from './classroom.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/', getClassrooms)
router.post('/save', saveClassroom)
router.patch('/update/:id', updateClassroomById)
router.delete('/delete/:id', deleteClassroom)
router.get('/:id', getClassroomById)

export default router
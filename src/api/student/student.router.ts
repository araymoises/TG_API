import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getStudents, getStudentById, saveStudent, updateStudentById, deleteStudent, inviteStudent } from './student.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/classroom/:classroom', getStudents)
router.post('/save', saveStudent)
router.patch('/update/:id', updateStudentById)
router.delete('/delete/:id', deleteStudent)
router.get('/:id', getStudentById)
router.post('/invite', inviteStudent)

export default router

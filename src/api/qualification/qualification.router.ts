import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getQualificationsByActivity, getQualificationsByStudent, getQualificationById, saveQualification, updateQualificationById, deleteQualification } from './qualification.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/activity/:activity', getQualificationsByActivity)
router.get('/student/:student', getQualificationsByStudent)
router.post('/save', saveQualification)
router.patch('/update/:id', updateQualificationById)
router.delete('/delete/:id', deleteQualification)
router.get('/:id', getQualificationById)

export default router
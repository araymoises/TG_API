import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getAnswers, getAnswerById, saveAnswer, updateAnswerById, deleteAnswer } from './answer.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/activity/:activity', getAnswers)
router.post('/save', saveAnswer)
router.patch('/update/:id', updateAnswerById)
router.delete('/delete/:id', deleteAnswer)
router.get('/:id', getAnswerById)

export default router

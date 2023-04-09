import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getContents, getContentById, saveContent, updateContentById, deleteContent } from './content.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/classroom/:classroom', getContents)
router.post('/save', saveContent)
router.patch('/update/:id', updateContentById)
router.delete('/delete/:id', deleteContent)
router.get('/:id', getContentById)

export default router
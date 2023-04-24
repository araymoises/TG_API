import {Router} from 'express'
import validate from '../../middlewares/validate'
import { getObjects, getObjectById, saveObject, updateObjectById, deleteObject } from './object.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/', getObjects)
router.post('/save', saveObject)
router.patch('/update/:id', updateObjectById)
router.delete('/delete/:id', deleteObject)
router.get('/:id', getObjectById)

export default router

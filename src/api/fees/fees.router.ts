import {Router} from 'express'
import validate from '../../middlewares/validate'
import {getFees} from './fees.controller'
import multer from 'multer'
import bodyParser from 'body-parser'
const upload = multer({dest: '/tmp/files/'})

const router: Router = Router({ mergeParams : true })

router.get('/', getFees)

export default router
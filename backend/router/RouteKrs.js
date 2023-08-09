import express from 'express'
import { createKrsMahasiswa } from '../controllers/ControllerKrs.js'
import { Authenticate } from '../middleware/Authenticate.js'

const router = express.Router()

router.post('/post_krs', Authenticate,createKrsMahasiswa)

export default router
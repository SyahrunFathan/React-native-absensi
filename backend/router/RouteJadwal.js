import express from 'express'
import { createDataJadwal, getDataJoinMatkul } from '../controllers/ControllerJadwal.js'
import {Authenticate} from '../middleware/Authenticate.js'

const router = express.Router()

router.post('/post', Authenticate,createDataJadwal)

export default router;
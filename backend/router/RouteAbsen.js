import express from 'express'
import { getDataById } from '../controllers/ControllerAbsen.js'
import { Authenticate } from '../middleware/Authenticate.js';

const router = express.Router()

router.get('/absen/:id', Authenticate,getDataById)

export default router;
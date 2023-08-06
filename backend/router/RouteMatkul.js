import express from 'express'
import { createData, generatorCode } from '../controllers/ControllerMatkul.js'

const router = express.Router()

router.get('/generator_code', generatorCode)
router.post('/create_data', createData)

export default router;
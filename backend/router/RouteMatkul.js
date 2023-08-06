import express from 'express'
import { createData, generatorCode, getDataMatkul } from '../controllers/ControllerMatkul.js'

const router = express.Router()

router.get('/generator_code', generatorCode)
router.post('/create_data', createData)
router.get('/get_data', getDataMatkul)

export default router;
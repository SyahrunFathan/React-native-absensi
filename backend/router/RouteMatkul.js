import express from 'express'
import { createData, generatorCode, getDataMatkul, getDataMatkulJoinToJadwal } from '../controllers/ControllerMatkul.js'
import { Authenticate } from '../middleware/Authenticate.js'

const router = express.Router()

router.get('/generator_code', Authenticate,generatorCode)
router.post('/create_data', Authenticate,createData)
router.get('/get_data', Authenticate,getDataMatkul)
router.get('/get_data_join/:id', Authenticate,getDataMatkulJoinToJadwal)

export default router;
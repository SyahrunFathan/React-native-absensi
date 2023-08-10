import express from 'express'
import { createKrsMahasiswa, deleteKrs, getDataKrsJoin } from '../controllers/ControllerKrs.js'
import { Authenticate } from '../middleware/Authenticate.js'

const router = express.Router()

router.post('/post_krs', Authenticate,createKrsMahasiswa)
router.get('/get_data/:id', Authenticate,getDataKrsJoin)
router.delete('/delete/:id', Authenticate,deleteKrs)

export default router
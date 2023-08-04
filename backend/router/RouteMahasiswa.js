import express from 'express'
import { updateMahasiswa, upload } from '../controllers/ControllerMahasiswa.js'
import { Authenticate } from '../middleware/Authenticate.js'

const router = express.Router()

router.patch('/mahasiswa/update/:id', Authenticate, upload.single('file'), updateMahasiswa)

export default router
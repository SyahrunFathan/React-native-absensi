import express from 'express'
import { generatorNim, updateMahasiswa, upload } from '../controllers/ControllerMahasiswa.js'
import { Authenticate } from '../middleware/Authenticate.js'

const router = express.Router()

router.patch('/update/:id', Authenticate, upload.single('file'), updateMahasiswa)
router.get('/nim_mahasiswa', generatorNim)

export default router
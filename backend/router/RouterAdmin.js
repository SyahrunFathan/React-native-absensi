import express from 'express'
import { createDataAdmin, updateDataAdmin, upload } from '../controllers/ControllerAdmin.js'
import { Authenticate } from '../middleware/Authenticate.js'

const router = express.Router()

router.post('/post', createDataAdmin)
router.patch('/update/:id', Authenticate,upload.single('file'),updateDataAdmin)

export default router;
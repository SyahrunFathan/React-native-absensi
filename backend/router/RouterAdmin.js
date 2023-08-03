import express from 'express'
import { createDataAdmin } from '../controllers/ControllerAdmin.js'

const router = express.Router()

router.post('/admin/post', createDataAdmin)

export default router;
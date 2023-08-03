import express from 'express'
import { Login, Logout, Register } from '../controllers/ControllerAuth.js'
import { Authenticate } from '../middleware/Authenticate.js'

const router = express.Router()

router.post('/auth/login', Login)
router.post('/auth/register', Authenticate,Register)
router.delete('/auth/logout/:id', Logout)

export default router;
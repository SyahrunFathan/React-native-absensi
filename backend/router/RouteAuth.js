import express from 'express'
import { Login, Logout, Register, updatePassword } from '../controllers/ControllerAuth.js'
import { Authenticate } from '../middleware/Authenticate.js'

const router = express.Router()

router.post('/login', Login)
router.post('/register', Authenticate,Register)
router.delete('/logout/:id', Logout)
router.patch('/update_password/:id' ,updatePassword)

export default router;
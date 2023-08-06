import express from 'express';
import { upload, updateDataDosen, getDataDosen } from '../controllers/ControllerDosen.js';
import { Authenticate } from '../middleware/Authenticate.js';

const router = express.Router()

router.get('/data', Authenticate,getDataDosen)
router.patch('/update_data_dosen/:id',  Authenticate, upload.single('file'), updateDataDosen)

export default router;
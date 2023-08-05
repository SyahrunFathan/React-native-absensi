import express from 'express';
import { upload, updateDataDosen } from '../controllers/ControllerDosen.js';
import { Authenticate } from '../middleware/Authenticate.js';

const router = express.Router()

router.patch('/update_data_dosen/:id',  Authenticate, upload.single('file'), updateDataDosen)

export default router;
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/Database.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
// import Model from './models/ModelMatkul.js'
dotenv.config()

import RouteAuth from './router/RouteAuth.js'
import RouteAdmin from './router/RouterAdmin.js'
import RouteMahasiswa from './router/RouteMahasiswa.js'
import RouteDosen from './router/RouteDosen.js'
import RouteMatkul from './router/RouteMatkul.js'
import RouteJadwal from './router/RouteJadwal.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

try {
    await db.authenticate()
    console.log('Database connected....');
    // await Model.sync()
} catch (error) {
    console.error(error);
}

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/mahasiswa", RouteMahasiswa)
app.use("/dosen", RouteDosen)
app.use("/admin",RouteAdmin)
app.use("/auth", RouteAuth)
app.use("/mata_kuliah", RouteMatkul)
app.use("/jadwal", RouteJadwal)

app.use('/public/images', express.static(path.join(__dirname, 'public/images')))

app.listen(5001, () => console.log('Server up running at port 5001....'))
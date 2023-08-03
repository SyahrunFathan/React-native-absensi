import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/Database.js'
// import Model from './models/ModelAdmin.js'
dotenv.config()

import RouteAuth from './router/RouteAuth.js'
import RouteAbsen from './router/RouteAbsen.js'
import RouteAdmin from './router/RouterAdmin.js'

const app = express()

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
app.use(RouteAuth)
app.use(RouteAbsen)
app.use(RouteAdmin)

app.listen(5001, () => console.log('Server up running at port 5001....'))
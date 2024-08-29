import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser'
import setupDB from './configs/database-confifg'
import {PORT}  from './configs/server-config'
import ApiV1Routes  from './routes/index'
const setupAndStartServer = async() => {
    const app = express()

    // Database connectivity
    setupDB();

    // Middlewares
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    
    app.use('/api',ApiV1Routes)

    
    // running at PORT
    app.listen(PORT, async() => {
        console.log(`Server is running at PORT ${PORT}`);
    })
}

setupAndStartServer();
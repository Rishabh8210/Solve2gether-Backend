const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {setupDB} = require('./configs/database-confifg');
const {PORT} = require('./configs/server-config');
const ApiV1Routes = require('./routes/index');
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
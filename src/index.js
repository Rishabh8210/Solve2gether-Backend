const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const setupAndStartServer = async() => {
    const {PORT} = require('./config/server-config')
    const app = express()
    // Middlewares
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    
    app.get('/', (req, res) => {
        res.send("Hii, User")
    })
    // running at PORT
    app.listen(PORT, async() => {
        console.log(`Server is running at PORT ${PORT}`);
    })
}

setupAndStartServer();
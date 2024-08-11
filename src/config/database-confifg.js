const mongoose = require('mongoose')
const { DBURL } = require('./server-config')

function setupDB(){
    const uri = DBURL
    console.log(uri)
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB Atlas');
    }).catch(err => {
        console.error('Error connecting to MongoDB Atlas', err);
    });
}

module.exports = {
    setupDB
}
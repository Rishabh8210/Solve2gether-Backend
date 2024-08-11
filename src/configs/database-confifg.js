const mongoose = require('mongoose')
const { DBURL } = require('./server-config')

function setupDB(){
    const uri = DBURL
    mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    }).catch(err => {
        console.error('Error connecting to MongoDB Atlas', err);
    });
}

module.exports = {
    setupDB
}
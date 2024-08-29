import mongoose from 'mongoose'
import { DBURL } from './server-config'

async function setupDB(){
    try {
        if(DBURL){
            const uri = DBURL
            await mongoose.connect(uri)
            console.log('Connected to MongoDB Atlas');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas', error);
    }
}

export default setupDB
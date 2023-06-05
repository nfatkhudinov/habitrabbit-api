const db = require('mongoose').default
const colors = require('colors')

const DATABASE_URI='mongodb://127.0.0.1:27017/habitrabbit'
const dbConnect = ()=>{
    console.log(`Trying to establish connection to database ${DATABASE_URI}`)
    db.connect(DATABASE_URI).catch(e => console.log(e))
    db.connection.on('connected',()=>console.log('Database connection established'.bgGreen.white))
    db.connection.on('error', ()=>console.log('Error while trying to establish database connection'.bgRed.white))
    db.connection.on('disconnected', ()=>console.log('Database connection lost'.bgRed.white))
}

module.exports = dbConnect

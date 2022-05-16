require('dotenv').config()
const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@pizzastime.ad6tp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(() => {
    console.log('Servidor iniciado!')
})
.catch((err) => console.log(err)) 

mongoose.Promise = global.Promise;

module.exports = mongoose;
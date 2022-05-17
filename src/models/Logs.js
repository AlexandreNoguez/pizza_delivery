const mongoose = require('../database/index');

const LogsSchema = new mongoose.Schema({
    loggedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: Object,
    title: {
        type: String,
        require: true,
    },
    type:{
        type: Number, //1- success 2- error 3- info
        require: true,
    },
}, {timestamps: true} );


const Logs = mongoose.model('Logs', LogsSchema);

module.exports = Logs;
const mongoose = require('../database/index');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    cpf: {
        type: String,
        unique: true,
        require: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
const mongoose = require('../database/index');
const bcrypt = require('bcryptjs')

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

UserSchema.pre('save', async function (next){
    const hash = await bcrypt.hash(this.cpf, 10);
    this.cpf = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
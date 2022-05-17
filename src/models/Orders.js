const mongoose = require('../database/index');

const OrderSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    pizzaList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    }],
    status: {
        type: String,
        default: 'Starting',
        require: true,
    },
}, {timestamps: true});


const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
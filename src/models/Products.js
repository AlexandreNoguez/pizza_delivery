const mongoose = require('../database/index');

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    value: {
        type: Number,
        require: true,
    },
}, {timestamps: true});


const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;
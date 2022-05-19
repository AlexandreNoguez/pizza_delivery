const express = require('express');
const routes = express.Router();
// const checkRoles = require('../middlewares/checkRoles')
// const authMiddleware = require('../middlewares/auth')

const { registerNewProduct, 
    listAllProducts, 
    listProductById, 
    editProduct, 
    deleteProduct 
} = require('../controllers/productsController')

// productsController
routes.get('/list', listAllProducts);
routes.post('/', registerNewProduct);
routes.get('/:id', listProductById);
routes.put('/:id', editProduct);
routes.delete('/:id', deleteProduct);

module.exports = routes;
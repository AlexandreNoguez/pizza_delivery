const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middlewares/auth')
const checkRoles = require('../middlewares/checkRoles')

const { registerNewProduct, 
    listAllProducts, 
    listProductById, 
    editProduct, 
    deleteProduct 
} = require('../controllers/productsController')

// productsController
routes.use(authMiddleware)
routes.get('/list', listAllProducts);
routes.post('/', registerNewProduct);
routes.get('/:id', listProductById);
routes.put('/:id', editProduct);
routes.delete('/:id', checkRoles, deleteProduct);

module.exports = routes;
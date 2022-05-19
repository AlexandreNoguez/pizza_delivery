const express = require('express');
const routes = express.Router();
// const checkRoles = require('../middlewares/checkRoles')
// const authMiddleware = require('../middlewares/auth')

const { createOrder, 
    listOrders, 
    deleteOrder, 
    editOrder, 
    listMyOrders, 
    getOrderById 
} = require('../controllers/orderController');

// orderRoutes
routes.post('/', createOrder);
routes.get('/', listMyOrders);
routes.get('/', listOrders);
routes.get('/:orderId', getOrderById);
routes.put('/:orderId', editOrder);
routes.delete('/:orderId', checkRoles, deleteOrder);

module.exports = routes;

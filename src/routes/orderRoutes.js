const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middlewares/auth')
// const checkRoles = require('../middlewares/checkRoles')

const { createOrder, 
    listOrders, 
    deleteOrder, 
    editOrder, 
    listMyOrders, 
    getOrderById 
} = require('../controllers/orderController');

// orderRoutes
routes.use(authMiddleware)
routes.post('/', createOrder);
routes.get('/', listMyOrders);
routes.get('/', listOrders);
routes.get('/:orderId', getOrderById);
routes.put('/:orderId', editOrder);
routes.delete('/:orderId', deleteOrder);

module.exports = routes;

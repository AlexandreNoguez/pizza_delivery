const express = require('express');
const routes = express.Router();
const checkRoles = require('./middlewares/checkRoles')

const { registerNewUser, authenticateUser, listAllUsers, listUserById, editUser, deleteUser } = require('./controllers/authController')
const { createOrder, listOrders, deleteOrder, editOrder, listMyOrders, getOrderById } = require('./controllers/orderController');
const { Router } = require('express');

// register/authenticate new users
routes.post('/auth/register', registerNewUser);
routes.post('/auth/authenticate', authenticateUser);
routes.get('/auth', checkRoles, listAllUsers);
routes.get('/auth/:id', checkRoles, listUserById);
routes.put('/auth/:id', editUser);
routes.delete('/auth/:id', deleteUser);


// orderRoutes
routes.post('/orders/', createOrder)
routes.get('/order/', checkRoles, listOrders)
routes.get('/order/getMyOrders', listMyOrders)
routes.get('/order/:orderId', checkRoles, getOrderById)
routes.delete('/order/:orderId', checkRoles, deleteOrder)
routes.put('/order/:orderId', editOrder)

// feedbackRoutes

module.exports = routes;
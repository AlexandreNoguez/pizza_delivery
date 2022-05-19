const express = require('express');
const routes = express.Router();
const checkRoles = require('./middlewares/checkRoles')
const authMiddleware = require('./middlewares/auth')


const { 
    registerNewUser, 
    authenticateUser, 
    listAllUsers, 
    listUserById, 
    editUser, 
    deleteUser 
} = require('./controllers/authController')

const { createOrder, 
    listOrders, 
    deleteOrder, 
    editOrder, 
    listMyOrders, 
    getOrderById 
} = require('./controllers/orderController');

const { registerNewProduct, 
    listAllProducts, 
    listProductById, 
    editProduct, 
    deleteProduct 
} = require('./controllers/productsController')

const { sendFeedback, 
    getFeedback 
} = require('./controllers/feedbackController')

// authRoutes
routes.post('/auth/register', registerNewUser);
routes.post('/auth/authenticate', authenticateUser);
routes.use(authMiddleware)
routes.get('/auth', checkRoles, listAllUsers);
routes.get('/auth/:id', checkRoles, listUserById);
routes.put('/auth/:id', editUser);
routes.delete('/auth/:id', deleteUser);


// orderRoutes
routes.post('/order/', createOrder)
routes.get('/order/', checkRoles, listOrders)
routes.get('/order/getMyOrders', listMyOrders)
routes.get('/order/:orderId', checkRoles, getOrderById)
routes.delete('/order/:orderId', checkRoles, deleteOrder)
routes.put('/order/:orderId', editOrder)

// productsController
routes.post('/pizza/', registerNewProduct);
routes.get('/pizza/list', listAllProducts);
routes.get('/pizza/:id', listProductById);
routes.put('/pizza/:id', editProduct);
routes.delete('/pizza/:id', deleteProduct);


// feedbackRoutes
routes.post('/feedback/', sendFeedback);
routes.get('/feedback/', getFeedback);

module.exports = routes;
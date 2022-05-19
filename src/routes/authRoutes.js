const express = require('express');
const routes = express.Router();
// const checkRoles = require('../middlewares/checkRoles')
// const authMiddleware = require('../middlewares/auth')

const { 
    registerNewUser, 
    authenticateUser, 
    listAllUsers, 
    listUserById, 
    editUser, 
    deleteUser 
} = require('../controllers/authController')

// authRoutes
routes.post('/register', registerNewUser);
routes.post('/authenticate', authenticateUser);
routes.get('/', listAllUsers);
routes.get('/:id', listUserById);
routes.put('/:id', editUser);
routes.delete('/:id', deleteUser);

module.exports = routes;

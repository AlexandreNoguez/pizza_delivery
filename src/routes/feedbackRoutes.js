const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middlewares/auth')

const { sendFeedback, 
    getFeedback 
} = require('../controllers/feedbackController')

// feedbackRoutes
routes.use(authMiddleware);
routes.post('/', sendFeedback);
routes.get('/', getFeedback);

module.exports = routes;

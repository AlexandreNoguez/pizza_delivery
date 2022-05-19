const express = require('express');
const routes = express.Router();

const { sendFeedback, 
    getFeedback 
} = require('../controllers/feedbackController')

// feedbackRoutes
routes.post('/', sendFeedback);
routes.get('/', getFeedback);

module.exports = routes;

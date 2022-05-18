const express = require('express');
const app = express();
const authMiddleware = require('./middlewares/auth')

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

require('./controllers/authController')(app)
app.use(authMiddleware)
require('./controllers/productsController')(app)
require('./controllers/orderController')(app)
require('./controllers/feedbackController')(app)

app.listen(3333);






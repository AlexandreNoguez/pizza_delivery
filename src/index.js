const express = require('express');
const app = express();
const authMiddleware = require('./middlewares/auth')
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

require('./controllers/authController')(app)
app.use(authMiddleware)
app.use(routes)
require('./controllers/productsController')(app)
require('./controllers/feedbackController')(app)

app.listen(3333);






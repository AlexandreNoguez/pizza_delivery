const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/auth', authRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/order', orderRoutes);
app.use('/pizza', productRoutes);

app.listen(3333);






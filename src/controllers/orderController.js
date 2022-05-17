const express = require('express')
const authMiddleware = require('../middlewares/auth');

const User = require('../models/Users')
const Products = require('../models/Products')
const Order = require('../models/Orders')

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const order = await Order.find().populate('user');
        
        return res.send({ order })

    } catch (err) {
        return res.status(400).send({error: 'Falha ao listar pedidos'})
        
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, pizzaList } = req.body;

        const order = await Order.create({ title, description, pizzaList, user: req.userId });

        return res.send({ order })
    } catch (err) {
        return res.status(400).send({error: 'Falha ao solicitar pedido'})
    }
});

router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('user').populate('pizzaList');
        console.log(req.params)
        return res.send({ order })

    } catch (err) {
        return res.status(400).send({error: 'Falha ao listar pedido'})
        
    }
});

router.put('/orderId', async (req, res) => {
    res.send({ok: true, user: req.userId});
});

router.delete('/:orderId', async (req, res) => {
    console.log(req.params)
    try {
        await Order.findByIdAndRemove(req.params.order);
        return res.send();

    } catch (err) {
        return res.status(400).send({error: 'Falha ao listar pedido'})
        
    }
});

module.exports = app => app.use('/progress', router);
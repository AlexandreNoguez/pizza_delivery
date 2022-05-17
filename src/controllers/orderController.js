const express = require('express')
const authMiddleware = require('../middlewares/auth');

// const User = require('../models/Users')
// const Products = require('../models/Products')
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

        return res.send({ order })

    } catch (err) {
        return res.status(400).send({error: 'Falha ao listar pedido'})
        
    }
});

router.put('/:orderId', async (req, res) => {
    try {
        const { title, description, pizzaList } = req.body;

        const order = await Order.findByIdAndUpdate(req.params.orderId, {
            title, 
            description, 
            pizzaList, 
            user: req.userId, 
            status: '' },
            {new: true});

        return res.send({ order })
    } catch (err) {
        return res.status(400).send({error: 'Falha ao solicitar pedido'})
    }
});

router.delete('/:orderId', async (req, res) => {
    try {
        await Order.findByIdAndRemove(req.params.orderId);
        return res.send({message: 'Pedido removido com sucesso'});

    } catch (err) {
        return res.status(400).send({error: 'Falha ao listar pedido'})
        
    }
});

module.exports = app => app.use('/progress', router);
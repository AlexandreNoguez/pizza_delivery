const Order = require('../models/Orders')

exports.createOrder = async (req, res) => {
    try {
        const { title, description, pizzaList } = req.body;

        const order = await Order.create({ title, description, pizzaList, user: req.userId });

        return res.send({ 
            order,
            message: 'Order registered successfuly'
        })
    } catch (err) {
        return res.status(400).send({error: 'Failed to register an order'})
    }
}

exports.listMyOrders = async (req, res) => {
    try {
        const order = await Order.find({user: req.userId}).populate(['user', 'pizzaList']);
        
        return res.send({ order })

    } catch (err) {
        return res.status(400).send({error: 'Failed to list orders'})
        
    }
}

exports.listOrders = async (req, res) => {
    try {
        const order = await Order.find().populate(['user', 'pizzaList']);
        
        return res.send({ order })

    } catch (err) {
        return res.status(400).send({error: 'Failed to list orders'})
        
    }
}


exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate(['user', 'pizzaList']);

        return res.send({ order })

    } catch (err) {
        return res.status(400).send({error: 'Failed to list an ID order'})
        
    }
}


exports.editOrder = async (req, res) => {
    const { title, description, pizzaList, status } = req.body;

    // if(!title, description, pizzaList){
    //     return res.status(400).send({error: 'Pedido não encontrado'})
    // }
    
    try {

        const order = await Order.findByIdAndUpdate(req.params.orderId, {
            title, 
            description, 
            pizzaList,
            status, 
            user: req.userId},
            {new: true});
            console.log(order)
        return res.send({ order })
    } catch (err) {
        return res.status(400).send({error: 'Failed ordering pizza'})
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndRemove(req.params.orderId);
        return res.send({message: 'Order removed successfuly'});

    } catch (err) {
        return res.status(400).send({error: 'Failed to list an order'})
        
    }
}
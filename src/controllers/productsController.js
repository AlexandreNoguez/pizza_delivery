const express = require('express');

const router = express.Router();
const Products = require('../models/Products');

router.post('/', async (req, res) => {
    const  { title, value }  = req.body;

    if(!title){
        return res.status(400).send({ error: 'O campo deve ser preenchido corretamente.' })
    }
    if(!value){
        return res.status(400).send({ error: 'O campo deve ser preenchido corretamente.' })
    }

    try {
        
        if (await Products.findOne({ title })){
            return res.status(400).send({ error: 'Pizza já existente'})
        }
        const product = await Products.create(req.body);


        return res.send ({ product });
    } catch (err) {
        return res.status(400).send({error: 'Falha no registro'});
    }
});

router.get('/list', async (req, res) => {
    try {
        const product = await Products.find();
        return res.status(200).send(product)
        
    } catch (err) {
        return res.status(400).send({error: 'Falha na busca'});
    }

})

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Products.findById({_id: productId});

        if(!product){
            return res.status(400).send({error: 'Produto não encontrado'})
        }
        return res.status(200).send(product);
    } catch (err) {
        return res.status(400).send({error: 'Falha na busca'});
    }
})

module.exports = app => app.use('/pizza', router);
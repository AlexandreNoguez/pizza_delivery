const Products = require('../models/Products');

exports.registerNewProduct = async (req, res) => {
    const  { title, value }  = req.body;

    if(!title){
        return res.status(400).send({ error: 'Invalid product name' })
    }
    if(!value){
        return res.status(400).send({ error: 'Invalid value' })
    }

    try {
        
        if (await Products.findOne({ title })){
            return res.status(400).send({ error: 'Pizza already exists'})
        }
        const product = await Products.create(req.body);


        return res.send ({ product });
    } catch (err) {
        return res.status(400).send({error: 'Failed on registration'});
    }
}

exports.listAllProducts = async (req, res) => {
    try {
        const product = await Products.find();
        return res.status(200).send(product)
        
    } catch (err) {
        return res.status(400).send({error: 'Failed listing products'});
    }

}

exports.listProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Products.findById({_id: productId});

        if(!product){
            return res.status(400).send({error: 'Product not found'})
        }
        return res.status(200).send(product);
    } catch (err) {
        return res.status(400).send({error: 'Failed searching product'});
    }
}

exports.editProduct = async (req, res) => {
    const { title, value } = req.body;
    try {
        
        const pizza = await Products.findByIdAndUpdate(req.params.id, {
            title, 
            value, 
        }, {new: true});
        
        return res.send({ pizza })
    } catch (err) {
        return res.status(400).send({error: 'Failed to update menu'})
    }
}

exports.deleteProduct = async (req, res) => {
    const product = req.params.id
    if(!product){
        return res.status(400).send({error: 'Product not found on menu'})
    }

    try {
        await Products.findByIdAndRemove(req.params.id);
        return res.send({message: 'Product removed successfuly!'});

    } catch (err) {
        return res.status(400).send({error: 'Failed deleting product'})
        
    }
}
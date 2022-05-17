const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const router = express.Router();

const Logs = require('../models/Logs');
const User = require('../models/Users');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 40000,
    });
}

router.post('/register', async (req, res) => {
    
    try {
        const  { email }  = req.body;
        // if (!email){
        //     return res.status(400).send({ error: 'Digite um e-mail válido'})
        // }

        if (await User.findOne({ email })){
            return res.status(400).send({ error: 'Usuário já existente'})
        }

        const user = await User.create(req.body);

        user.password = undefined;
        
        await Logs.create({loggedUser: user._id, title: "User created", type: 1})
        return res.send ({ user, token: generateToken({ id: user.id }), });
    } catch (err) {
        await Logs.create({loggedUser: req.userId, title: "Error creating new user", type: 2})
        return res.status(400).send({error: 'Falha no registro'});
    }
});

router.post('/authenticate', async (req, res) => {
    try {
    const  { email, password }  = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return res.status(400).send({ error: 'Usuário não encontrado!' })
    }
    
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'Senha inválida'});
    }

    user.password = undefined;
    await Logs.create({loggedUser: user._id, title: "User authenticated", type: 1})
    res.send({ user, token: generateToken({ id: user.id }) });
} catch (err) {
        await Logs.create({loggedUser: user._id, title: "Error authenticating user", type: 2})
        return res.status(400).send({error: 'Falha no registro'});
    }
    
})

router.get('/', async (req, res) => {
    try {
        const listUsers = await User.find();
        return res.status(200).send(listUsers)
        
    } catch (err) {
        return res.status(400).send({error: 'Falha na busca'});
    }

})

router.get('/:id', async (req, res) =>{
    const userId = req.params.id;
    const user = await User.findOne({_id: userId})

    if(!user && undefined && null){
        return res.status(422).send({error: "Usuário não encontrado" })
    }
    
    try {

        return res.status(200).send(user)
        
    }   catch (error) {
        return res.status(400)
    }
})

router.put('/:id', async (req, res) =>{
    const userId = req.params.id;
    const { name, email, password } = req.body;
    
    const userDetails = {
        name,
        email,
        password,
    }
    // if(!userId){
        //     return res.status(422).json({error: "Usuário(a) não encontrado(a)" })
        // }
        
        try {
            const updateUser = await User.findByIdAndUpdate({
                _id: userId},
                userDetails,
                {new: true}
                )
                userDetails.password = undefined
                updateUser.save(userId)
                return res.status(200).send(userDetails)
        
    }   catch (error) {
        return res.status(400)
    }
})

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    
    const user = await User.findOne({ _id: userId })
    
    if(!user){
        return res.status(400).send({message: 'Usuário não encontrado'})
    }
    
    try {
        await User.deleteOne({_id: userId})
        return res.status(200).send({message: 'Usuário removido com sucesso'})
    } catch (error) {
        return res.status(400).send({error: 'Falha ao remover'})
    }
})

module.exports = app => app.use('/auth', router);
const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const Logs = require('../models/Logs');
const router = express.Router();
const User = require('../models/Users');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 40000,
    });
}

router.post('/register', async (req, res) => {
    const  { email }  = req.body;
    console.log(req.body)
    try {
        if (!email){
            return res.status(400).send({ error: 'Digite um e-mail válido'})
        }

        if (await User.findOne({ email })){
            return res.status(400).send({ error: 'Usuário já existente'})
        }
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send ({ user, token: generateToken({ id: user.id }), });
    } catch (err) {
        return res.status(400).send({error: 'Falha no registro'});
    }
});

router.post('/authenticate', async (req, res) => {
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
})

router.get('/:id', async (req, res) =>{
    const userId = req.params.id;
    try {
        const user = await User.findOne({_id: userId})

        if(!userId){
            return res.status(422).send({error: "Usuário não encontrado" })
        }

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
    if(!userId){
        return res.status(422).json({error: "Usuário não encontrada" })
    }

    try {
        const updateUser = await User.updateOne({_id: userId}, userDetails)
        const updateUserName = await User.updateOne({name: userId}, {pass: userDetails})
        const updateUserPassword = await User.updateOne({password: userId}, userDetails)

        if(!userId){
            return res.status(422).send({error: "Usuário não encontrada" })
        }
        updateUser.save(userId)
        return res.status(200).send(userDetails)
        
    }   catch (error) {
        return res.status(400)
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

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    
    const user = await User.findOne({_id: userId})
    
    if(!user){
        return res.status(400).send({message: 'Usuário não encontrado'})
    }

    try {
        await User.deleteOne({_id: userId})
        return res.status(200).send({message: 'Usuário removido com sucesso'})
    } catch (error) {
        return res.status(400)
        
    }
})




module.exports = app => app.use('/auth', router);
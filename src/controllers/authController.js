const express = require('express');
const router = express.Router();

const User = require('../models/Users');


router.post('/register', async (req, res) => {
    const  {cpf}  = req.body;
    console.log(req.body)
    try {
        
        if (await User.findOne({cpf})){
            return res.status(400).send({ error: 'Usuário já existente'})
        }
        const user = await User.create(req.body);

        user.cpf = undefined;

        return res.send ({ user });
    } catch (err) {
        return res.status(400).send({error: 'Falha no registro'});
    }
});

router.post('/authenticate', async (req, res) =>{
    const  { cpf, password }  = req.body;

    const user = await User.findOne({ cpf }).select('+password');

    // if(!user){
    //     return res.status(400).send({error: 'Usuário não encontrado!'})
    // }
    
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'Cadastro inválido'});
    }

    user.cpf = undefined;

    res.send({ user, token: generateToken({ _id: user.id })});
})

module.exports = app => app.use('/auth', router);
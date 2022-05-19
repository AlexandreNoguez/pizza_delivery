const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const Logs = require('../models/Logs');
const User = require('../models/Users');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 40000,
    });
}

exports.registerNewUser = async (req, res) => {
    
    try {
        const  { name, email, password, roles, }  = req.body;

        if (!name){
            return res.status(400).send({ error: 'Type a valid name'})
        }
        if (!roles){
            return res.status(400).send({ error: 'Type a valid role'})
        }
        if (password <= 5){
            return res.status(400).send({ error: 'Type a valid role'})
        }
        
        if (!email){
            return res.status(400).send({ error: 'Type a valid email'})
        }
        
        if (await User.findOne({ email })){
            return res.status(400).send({ error: 'User already exists'})
        }

        const user = await User.create(req.body);

        user.password = undefined;
        
        await Logs.create({loggedUser: user._id, title: "User created", type: 1})
        return res.send({ 
            user, 
            token: generateToken({ id: user.id }), 
            message: 'User registered successfuly' 
        });

    } catch (err) {
        return res.status(400).send({error: 'Failed to register new user, try again.'});
    }
}

exports.authenticateUser = async (req, res) => {
    try {
    const  { email, password }  = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return res.status(400).send({ error: 'User and password do not match' })
    }
    
    if(!(await bcrypt.compare(password, user.password))){
        return res.status(400).send({error: 'User and password do not match'});
    }

    user.password = undefined;
    await Logs.create({loggedUser: user._id, title: "User authenticated", type: 1})
    res.send({ user, 
        token: generateToken({ id: user.id }),
        message: 'User logged in successfuly' 
    });
} catch (err) {
        return res.status(400).send({error: 'User and password do not match'});
    }
    
}

exports.listAllUsers = async (req, res) => {
    try {
        const listUsers = await User.find();
        return res.status(200).send(listUsers)
        
    } catch (err) {
        return res.status(400).send({error: 'Failed listing all users'});
    }
}


exports.listUserById = async (req, res) =>{
    const userId = req.params.id;
    const user = await User.findOne({_id: userId})

    if(!user && undefined && null){
        return res.status(422).send({error: 'User not found' })
    }
    
    try {

        return res.status(200).send(user)
        
    }   catch (error) {
        return res.status(400).send({error: 'User not found'})
    }
}

exports.editUser = async (req, res) =>{
    try {
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
        
        const updateUser = await User.findByIdAndUpdate({
            _id: userId},
            userDetails, 
            {new: true}
            )
            userDetails.password = undefined
            updateUser.save(userId)
            // console.log(userDetails, updateUser, name, email, password)
            return res.status(200).send({
                updateUser, 
                message: 'User details updated successfuly'
            })
            
        }catch (err) {
        return res.status(400).send({error: "Failed to update user's details"})
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    
    const user = await User.findOne({ _id: userId })
    
    if(!user){
        return res.status(400).send({message: 'User not found'})
    }
    
    try {
        await User.deleteOne({_id: userId})
        return res.status(200).send({message: 'User removed successfuly'})
    } catch (err) {
        return res.status(400).send({error: 'Failed to remove the user'})
    }
}

const authMiddleware = require('../middlewares/auth')
const User = require('../models/Users')
// const client = async (permissions) => {
//     return (req, res, next) =>{
//         const userRole = req.body.roles;
//         if(permissions.includes(userRole)){
//             next()
//         }else{
//             return res.status(401).send({ error: unauthorized})
//         }
//     }
// }
// const employe = async (permissions) => {
//     return (req, res, next) =>{
//         const userRole = req.body.roles;
//         if(permissions.includes(userRole)){
//             next()
//         }else{
//             return res.status(401).send({ error: unauthorized})
//         }
//     }
// }
const admin =  (permissions) => {
    return async (req, res, next) =>{
        const userId = User.find(req.params._id)
        const user = await User.find({id: userId});
        console.log(userId)
        if(permissions.includes([3])){
            next()
        }else{
            return res.status(401).send({ error: 'Unauthorized'})
        }
    }
}








module.exports = { 
    // client, employe, 
    admin }

// module.exports = async (req, res, next) => {
//     const loggedUser = await User.findById(req.userId);

//     if(!loggedUser === 2){
//         return res.status(401).send({error: 'No authorization'});
//     }

// }

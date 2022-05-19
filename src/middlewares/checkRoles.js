const User = require('../models/Users')

const checkRoles = async(req, res, next) => {
    const loggedUser = await User.findById(req.userId);

    switch (req.route.path) {
        case '/':
            if (loggedUser.roles.includes(2) || loggedUser.roles.includes(3)) {
                return next()
            } else {
                return res.status(401).json({message: "User can't acces this area"})
            }
            break;

        case '/':
            if (loggedUser.roles.includes(2) || loggedUser.roles.includes(3)) {
                return next()
            } else {
                return res.status(401).json({message: "User can't acces this area"})
            }
            break;
    
        default:
            break;
    }

    next()
}


module.exports = checkRoles;






  

// module.exports = async (req, res, next) => {
//     const loggedUser = await User.findById(req.userId);

//     if(!loggedUser === 2){
//         return res.status(401).send({error: 'No authorization'});
//     }

// }

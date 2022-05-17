const jwt = require('jsonwebtoken');
const User = require('../models/Users')
module.exports = async (req, res, next) => {
    const loggedUser = await User.findById(req.userId)

}

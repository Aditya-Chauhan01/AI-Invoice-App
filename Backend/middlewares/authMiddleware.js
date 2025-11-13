const jwt = require('jsonwebtoken');
const user = require('../models/User')

const protect = async (req, res, next) => {
    let token;
    // console.log("Received Token:", req.headers.authorization);
 

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        
    ){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await user.findById(decoded.id).select('-password');

            next();

        } catch (error) {
            return res.status(401).json({message: 'Not authorized, token failed'});
        }
    }
    if(!token) {
        return res.status(401).json({message: "Not authorized, no token"});
    }
};

module.exports = { protect };
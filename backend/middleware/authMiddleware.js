const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require ('../models/User');

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try{
            token = req.headers.authorization.split(' ')[1];
            console.log('Token found', token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded id" , decoded.id);

            req.user = await User.findById(decoded.id).select('-password');
            console.log("user found" , req.user);

            next();

        }

        catch(errror){
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');       
    }
    }

    if(!token){
        res.status(401);
        throw new Error('No token')
    }

});

module.exports = {protect};
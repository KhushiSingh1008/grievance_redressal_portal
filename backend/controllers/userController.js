const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const{name , email , password} = req.body;

    try{
        if(!name || !email || !password){
            return res.status(400).json({message: `Fill the required fields`});
        }

        const userExists = await User.findOne ({email});
        if(userExists){
            return res.status(400).json({message: `The user already exists`});
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user){
            res.status(201).json({
                _id : user.id,
                name : user.name,
                email : user.email,
                role : user.role,
                token : generateToken(user._id),
            });
        }
        else{
            res.status(400).json({message: `Invalid data`});
        }
    }
    catch(error){
        res.status(500).json({message : error.message});
    }

};

const loginUser = async (req , res) => {
    const {email , password } = req.body;

    try {
        const user = await User.findOne({email});

        if (user && (await user.matchPassword(password))){
            res.json({
                _id : user.id,
                name : user.name,
                email : user.email,
                role : user.role,
                token : generateToken(user._id),
            });
        }
        else{
            res.status(401).json({message:'Wrong credentials'});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const getMe = async (req, res) => {

    console.log("Inside getMe. req.user is:", req.user);
    res.status(200).json(req.user);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '5d', 
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
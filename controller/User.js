require('dotenv').config()

const UserAccount = require('../model/User.js');
const User = UserAccount.user;

const bcrypt = require('bcrypt');

const  jwt = require('jsonwebtoken');



exports.createUser = async (req,res) => {
    const prevUsers = await User.findOne({emailid : req.body.emailid});
    if(!!prevUsers)
    {
        res.status(400).json({'Error Message': 'Account with this emailid already exists'});
        return;
    }

    try 
    {
        const user = new User(req.body);
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password,salt);
        user.password = secPass;
        // eslint-disable-next-line 
        const doc = await user.save();
        const data = {
            user:{
                id : user.id
            }
        }
        const authToken = jwt.sign(data,process.env.JWT_SECRET);
        res.status(201).json({'authToken' : authToken});
    }
    catch(err)
    {
        // console.log(err);
        // if(!!err && err.keyPattern.emailid === 1)
        // {
        //     console.log('Account with this emailid already exists');
        //     res.status(403).json({'Error Message': 'Account with this emailid already exists'});
        // }
        // else
        
        res.status(403).json(err);
    }
}
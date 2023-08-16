const express = require('express');
const userRouter = express.Router();
const User = require('../controller/User.js');
const { body } = require('express-validator');
// const { body , validationResult} = require('express-validator');

// userRouter.post('/',(req,res) =>
// {
//     // const user = new User(req.body);
//     // let doc = user.save();
//     // console.log(req.body);
//     // res.send(doc);
// });

userRouter.post('/',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('emailid','Enter a valid email address').isEmail(),
    body('password','Password should atleast have 5 characters').isLength({min : 5})
],User.createUser);

// const auth = ((req,res,next) => {
//     if(req.body.email)
//     next();
// })


userRouter.post('/login',[
    body('emailid','Enter a valid email address').isEmail(),
    body('password','Password cannot be blank').exists(),
],User.loginUser);

exports.userRoute = userRouter;

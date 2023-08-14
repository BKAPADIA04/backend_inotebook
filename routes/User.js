const express = require('express');
const userRouter = express.Router();
const User = require('../controller/User.js');
// const { body , validationResult} = require('express-validator');

// userRouter.post('/',(req,res) =>
// {
//     // const user = new User(req.body);
//     // let doc = user.save();
//     // console.log(req.body);
//     // res.send(doc);
// });

userRouter.post('/',User.createUser);

exports.userRoute = userRouter;

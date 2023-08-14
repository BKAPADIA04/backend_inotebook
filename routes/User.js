const express = require('express');
const userRouter = express.Router();
const User = require('../controller/User.js');
// userRouter.post('/',(req,res) =>
// {
//     // const user = new User(req.body);
//     // let doc = user.save();
//     // console.log(req.body);
//     // res.send(doc);
// });

userRouter.post('/',User.createUser);

exports.userRoute = userRouter;

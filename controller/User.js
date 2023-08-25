require("dotenv").config();

const UserAccount = require("../model/User.js");
const User = UserAccount.user;

const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  const arr = errors.array();
  let success = true;
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ success:success,error: arr });
  }
  const prevUsers = await User.findOne({ emailid: req.body.emailid });
  if (!!prevUsers) {
    success = false;
    res
      .status(400)
      .json({ success:success,"error": "Account with this emailid already exists" });
    return;
  }

  try {
    const user = new User(req.body);
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    user.password = secPass;
    // eslint-disable-next-line
    const doc = await user.save();
    const data = {
      user: {
        id: user.id,
      }
    };
    const authToken = jwt.sign(data, `${process.env.JWT_SECRET}`);
    res.status(201).json({ success:success,authToken: authToken });
  } catch (err) {
    // console.log(err);
    // if(!!err && err.keyPattern.emailid === 1)
    // {
    //     console.log('Account with this emailid already exists');
    //     res.status(403).json({'Error Message': 'Account with this emailid already exists'});
    // }
    // else
    console.log(err);
    success = false;
    res.status(403).json({success:success,err});
  }
};

exports.loginUser = async (req, res) => {
  try {
  const errors = validationResult(req);
  const arr = errors.array();
  let printmsg;
  let success = true;
  if (!errors.isEmpty()) {
    for (const errorObject of arr) {
      const errorMsg = errorObject.msg;
      printmsg = errorMsg;
      success = false;
    }
    return res.status(400).json({ success:success,error: printmsg });
  }

  const {emailid,password} = req.body;
    let user = await User.findOne({emailid : emailid});
    if(!user) {
        success = false;
        return res.status(400).json({success : success,'Error' : 'Please try to login with correct credentials'});
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare) {
      success = false;
        return res.status(400).json({success : success,'Error' : 'Please try to login with correct credentials'});
    }
    const data = {
        user: {
          id: user.id,
        },
    };
    const authToken = jwt.sign(data, `${process.env.JWT_SECRET}`);
    res.status(201).json({ success:success,authToken: authToken });
  }

  catch(err) {
    console.error(err);
    res.status(500).json({'error' : "Internal Server Error"});
  }
};

exports.decodeUser = async (req,res) => {
  try {
    const id = req.user.id;
    const user = await User.findOne({_id : id}).select('-password');
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error' : "Internal Server Error"});
  }
}
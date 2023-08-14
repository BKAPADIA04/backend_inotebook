const UserAccount = require('../model/User.js');
const User = UserAccount.user;

exports.createUser = async (req,res) => {
    if(User.findOne({'emailid' : req.body.emailid}))
    {
        res.status(400).json({'Error Message': 'Account with this emailid already exists'});
        return;
    }
    const user = new User(req.body);
    try 
    {
        let doc = await user.save();
        res.status(201).json(doc);
    }
    catch(err)
    {
        res.status(403).json(err);
    }
}
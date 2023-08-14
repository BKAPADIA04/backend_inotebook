const UserAccount = require('../model/User.js');
const User = UserAccount.user;

exports.createUser = async (req,res) => {
    const user = new User(req.body);
    let doc = await user.save();
    res.json(doc);
}
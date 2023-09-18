const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.UserAdder = async (req, res) => {
  const user = User({
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  // const token=await user.generateJWT();
  // console.log(token);
  return res.status(200).send(user);
};

module.exports.userUpdater = async (req, res) => {
  const user_incoming = req.body.user;
  if(user_incoming.userId=='') return res.send('Hello');
  const user = await User.findOneAndUpdate(
    { _id: user_incoming.userId },
    {
      $set: {
        name: user_incoming.name,
        sid: user_incoming.sid,
      },
    },
    {
      new: true,
    }
  ); 
  if(user) return res.status(200).send(user);
  return res.status(400).send('User Not Found');
};

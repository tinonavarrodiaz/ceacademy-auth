const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const index = (req, res) => {
  User.find({}, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

const store = async (req, res) => {
  if (!req.body.password || req.body.password !== req.body.passwordr) {
    return res.status(400).json({ message: 'password debe ser igual' });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  try {
    await user.save();
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYjc0MGE5ODdhMzMwMDZmNzMwMDExNiIsIm5hbWUiOiJUaW5vIE5hdmFycm8iLCJlbWFpbCI6InRpbm9AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkZ0JyU2VyenRxZkZuaHlWd1VJM2NJdTZZSDJSdFBLT1dnanl4R0dHWXVDTGY2bVcyU3FOaFMiLCJhY3RpdmUiOnRydWUsImFkbWluIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTA1VDIxOjI3OjA1LjcwNFoiLCJfX3YiOjB9LCJpYXQiOjE2NzI5NjExMzV9.xNUBbgOUMNFFHCjJinwXYR2T46I9nw858qbcg-FbxfY

const login = (req, res) => {
  // res.send(req.body.email);
  User.findOne({ email: req.body.email }, (err, result) => {
    if (err) return res.status(500).json({ message: err });
    if (result) {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        // res.send('contraseña correcta');
        jwt.sign({ user: result }, 'ceacademy-secret-key', (err, token) => {
          res.send({ token: token });
        });
      } else {
        res.status(400).json({ message: 'contraseña incorrecta' });
      }
    } else {
      res.status(400).json({ message: 'No existe el usuario' });
    }
  });
};

module.exports = {
  index,
  store,
  login,
};

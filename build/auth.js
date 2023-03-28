const jwt = require('jsonwebtoken');
const key = 'key';

function login(req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  jwt.sign({ user }, key, function (err, token) {
    res.json({
      token,
    });
  });
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: 'invalid token',
    });
  }
}

module.exports = {
  login,
  verifyToken,
};
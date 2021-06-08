const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, jwtSecret, { expiresIn: 86400 })
    console.log('token', token)
    return res.cookie('token', token, {
      httpOnly: true,
      sameSite: "Lax"
    })
  };
  module.exports = generateToken
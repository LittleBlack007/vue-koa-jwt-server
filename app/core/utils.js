const jwt = require('jsonwebtoken');
const {secretKey, expiresIn}  = require('../config/config.js'); 

// 生成token
function generateToken(uid,scope){
  const token = jwt.sign(
    {
      uid,scope
    },
    secretKey,
    {
      expiresIn
    }
  )
  return token;
}

module.exports = {
  generateToken,
}
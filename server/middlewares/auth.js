const jwt = require('jsonwebtoken');
const config = require('config');

const authToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if(!token) return res.sendStatus(401)
  try {
    const decode = jwt.verify(token, config.get('accessTokenSecret'))
    // handle iat time and exp time. If exp time was expired, send new token


    // done handle time
    
    req.user = decode.user;// attach user info to req
    next()
  } catch (error) {
    console.log(error);
    res.sendStatus(403)
  }

}

module.exports = authToken
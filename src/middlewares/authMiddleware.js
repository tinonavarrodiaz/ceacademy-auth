const authMiddleware = (req, res, next) => {
  // console.log('auth middleware');
  const authorization_header = req.headers['authorization'];
  if (authorization_header !== undefined) {
    console.log(authorization_header);
    const token = authorization_header.split(' ')[1];
    req.token = token;
    next();
  } else {
    console.log('no hay token');
  }
};

module.exports = authMiddleware;

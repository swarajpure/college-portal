const jwt = require('jsonwebtoken');

const isUser = (req, res, next) => {
  const token = req.cookies.session;
  if (!token) {
    return res.status(401).json({ message: 'You need to be logged in to view this page!' });
  }
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  req.userData = decoded; // adding name and role to the req object
  return next();
};

const isTeacher = (req, res, next) => {
  const token = req.cookies.session;
  if (!token) {
    return res.status(401).json({ message: 'You need to be logged in to proceed!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded.role === 'teacher') {
      req.userData = decoded;
      return next();
    }

    return res.status(404).json({ message: "You're not allowed to post!" });
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};

module.exports = {
  isTeacher,
  isUser
};

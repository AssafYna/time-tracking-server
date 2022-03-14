import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const auth = async (req, res, next, isAdminAuth) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    if (isAdminAuth && !user.isAdmin) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send('Please authenticate.');
  }
};

const userAuth = (req, res, next) => auth(req, res, next);

const adminAuth = (req, res, next) => auth(req, res, next, true);

export { userAuth, adminAuth };

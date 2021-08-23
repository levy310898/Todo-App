const argon2 = require('argon2');// for hash password
const express = require('express');
const { body, check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const router = express.Router();

const config = require('config');
const tokenSecret = config.get('accessTokenSecret');
const expireTime = config.get('expireTime');
const User = require('../models/User');
const authToken = require('../middlewares/auth');

//@route POST /api/auth/register
//@desc register user
//@access : public

router.post('/register',
  body('email').isEmail(),
  body('name').not().isEmpty(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    // checking validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false, message: errors.array() });
    }

    const {email,password,name } = req.body
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, message: 'email is exist!!' });
      }

      const hashPassword = await argon2.hash(password);

      const newUser = new User({ email, password:hashPassword, name });
      await newUser.save();//save data

      // create token
      const accessToken = jwt.sign(
        { user: { id: newUser._id, name } },
        tokenSecret,
        { expiresIn: expireTime },// expire 1 day
        (err, accessToken) => {
          if (err) throw (err)
          else {
            return res.status(200).json({ success: true, message: 'register success', accessToken })
          }
        })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
)


//@route POST /api/auth/login
//@desc login user
//@access : public

router.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    // checking validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { email, password } = req.body
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Incorrect email !!!' });
      }

      // email valid

      const passwordVerify = await argon2.verify(user.password, password);

      if (!passwordVerify) {
        return res.status(400).json({ success: false, message: 'Incorrect password!!!' });
      }

      // password valid, all good
      jwt.sign(
        { user: { id: user._id, user: user.name } },
        tokenSecret,
        { expiresIn: expireTime },// expire 1 day
        (err, accessToken) => {
          if (err) throw (err)
          else {
            return res.status(200).json({ success: true, message: 'register success', accessToken })
          }
        })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
)

module.exports = router;
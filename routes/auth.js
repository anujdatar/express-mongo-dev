const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')

// user registration
router.post('/register', async (req, res) => {

  // validate data
  const { error } = registerValidation(req.body) // no await here or it doesn't go to next step on error
  if (error) return res.status(400).send(error.details[0].message)

  // check of user email already in db
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send('email already exists')

  // hash passwords
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // create new user in db
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

  try {
    const savedUser = await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

// user login
router.post('/login', async (req, res) => {
  // request data validation
  const { error } = loginValidation(req.body) // no await here or it doesn't go to next step on error
  if (error) return res.status(400).send(error.details[0].message)

  // checking if email exists in db
  const user = await User.findOne({ email: req.body.email })
  // ambigious message in case someone wants to see if email is registered
  if (!user) return res.status(400).send('Email not registered')

  // verify password
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid password')

  // create jwtoken and assign to user login
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router

const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../models/User')

router.get('/', verify, async (req, res) => {

  const user = await User.findOne({ _id: req.user._id })
  if (!user) {
    return res.send('no user')
  } else {
    res.send(user.email)
  }



  // res.json({
  //   posts: {
  //     title: 'first post',
  //     description: 'random data with limited access'
  //   }
  // })
})

module.exports = router

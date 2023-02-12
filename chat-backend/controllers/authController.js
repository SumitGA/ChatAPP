const User = require('../models/').User
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    // find the user
    const user = await User.findOne({
      where: {
        email
      }
    })
    // check if user found
    if(!user) return res.status(404).json({message: 'User not found!'})

    // check if password matches
    if(!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({message: 'Incorrect password!'})
    }
    
    // generate auth token

    return res.send(user)

  } catch (e) {

  }
}

exports.register = async (req, res) => {}

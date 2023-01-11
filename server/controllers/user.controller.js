const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { User, Device } = require('../models')

const tokenTtl = 86400 // 24 hours

const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: tokenTtl })
}

const signup = async (req, res) => {
  const body = req.body

  const email = body.email
  const password = body.password
  const firstName = body.firstName
  const lastName = body.lastName
  var phone = body.phone

  if (!email || !password || !firstName || !lastName ) {
    res.status(400).send({ message: 'Required data is missing.' })
    return
  }

  if (!validator.isEmail(email)) {
    res.status(400).send({ message: 'Email is not valid.' })
    return
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400).send({ message: 'Password is not strong enough.' })
    return
  }
  
  try {
    const existed = await User.findOne({
      where: {
        email: email
      }
    })

    if (existed) {
      res.status(409).send({ message: 'Email is already existed.' })
      return
    }

    const salt = await bcrypt.genSalt(7)
    const hashedPassword = await bcrypt.hash(password, salt)

    if (phone) {
      phone = phone.replace(/-/g, '')
    }
  
    const user = {
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      phone: phone
    }

    User.create(user)
      .then(user => {
        const token = createToken(user.id)

        res.status(200).send({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          accessToken: token,
          accessTokenTtl: tokenTtl
        })
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const login = async (req, res) => {
  const body = req.body

  const email = body.email
  const password = body.password
  const reqDevice = body.device

  if (!email || !password) {
    res.status(400).send({ message: 'Required data is missing.' })
    return
  }

  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    
    if (!user) {
      res.status(400).send({ message: 'Email is incorrect.' })
      return
    }

    const isMatched = await bcrypt.compare(password, user.password)
    
    if (!isMatched) {
      res.status(400).send({ message: 'Password is incorrect.' })
      return
    }

    if (reqDevice) {
      const device = {
        email: user.email,
        os: reqDevice.os,
        model: reqDevice.model,
        token: reqDevice.token
      }

      const existed = await Device.findOne({
        where: {
          email: user.email,
          os: reqDevice.os
        }
      })

      if (existed) {
        Device.update({
          token: reqDevice.token
        }, {
          where: {
            email: user.email,
            os: reqDevice.os
          }
        })
        .then(device => {
          const token = createToken(user.id)
  
          res.status(200).send({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            accessToken: token,
            accessTokenTtl: tokenTtl
          })
        })
        .catch(err => {
          res.status(500).send({ message: err.message })
        })
      } else {
        Device.create(device)
        .then(device => {
          const token = createToken(user.id)
  
          res.status(200).send({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            accessToken: token,
            accessTokenTtl: tokenTtl
          })
        })
        .catch(err => {
          res.status(500).send({ message: err.message })
        })
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = { signup, login }

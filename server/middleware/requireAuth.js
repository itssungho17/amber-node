const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({ error: 'Authorization token is required.' })
    return
  }

  try {
    const token = authorization.split(' ')[1]
    const id = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = id
    next()

  } catch(err) {
    res.status(401).json({ error: 'Request is unauthorized.' })
  }
}

module.exports = requireAuth

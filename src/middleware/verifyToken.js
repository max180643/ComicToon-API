const cognitoExpress = require('../util/cognito.config')

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const token = bearer[1]

    cognitoExpress.validate(token, (err, response) => {
      if (err) {
        res.status(401).send({
          status: 'failure',
          response: 'invalid token.'
        })
      } else {
        console.log(response)
        next()
      }
    })
  } else {
    res.status(403).send({
      status: 'failure',
      response: 'missing authentication token.'
    })
  }
}

module.exports = verifyToken

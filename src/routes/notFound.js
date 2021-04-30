const router = require('express').Router()

router.get('*', (req, res) => {
  res.status(404).send({
    status: 'failure',
    response: 'route not found.'
  })
})

module.exports = router

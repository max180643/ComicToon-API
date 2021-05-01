const router = require('express').Router()
const uploadSingleImageS3 = require('../controllers/imageController')

// Add new comic
router.post('/add', (req, res) => {
  uploadSingleImageS3(req, res, (err) => {
    // File type error
    if (err) {
      return res.status(400).send({
        status: 'failure',
        response: 'only .png, .jpg and .jpeg format allowed.'
      })
    }

    res.status(200).send({
      status: 'success',
      response: req.file.location
    })
  })
})

module.exports = router

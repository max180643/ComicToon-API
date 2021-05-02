const router = require('express').Router()
const uploadSingleImageS3 = require('../controllers/imageController')
const dynamiteClient = require('../util/dynamite.config')
const { DateTime } = require('luxon')
const { filterComicData } = require('../controllers/dataController')
const dotenv = require('dotenv')

dotenv.config()

// Add new comic
router.post('/add', async (req, res) => {
  await uploadSingleImageS3(req, res, (err) => {
    // File type error
    if (err) {
      return res.status(400).send({
        status: 'failure',
        response: 'only .png, .jpg and .jpeg format allowed.'
      })
    }

    // Get data from request body
    const { name, description } = req.body

    // Get data from uploadSingleImageS3
    const { key, location } = req.file

    // Prepare data
    const comicData = {
      id: key.slice(6, 16),
      name: name,
      description: description,
      cover: location,
      date: DateTime.now().setZone('Asia/Bangkok').toString()
    }

    // Add new record to DynamoDB
    dynamiteClient
      .putItem(process.env.DYNAMODB_BOOK_TABLE_NAME, comicData)
      .execute()
      .then((data) => {
        res.status(200).send({
          status: 'success',
          response: data.result
        })
      })
  })
})

// Get all comic
router.get('/all', async (req, res) => {
  // Get all records from DynamoDB
  await dynamiteClient
    .newScanBuilder(process.env.DYNAMODB_BOOK_TABLE_NAME)
    .execute()
    .then((data) => {
      const formatData = data.result.map((record) => {
        return filterComicData(record)
      })

      res.status(200).send({
        status: 'success',
        response: formatData
      })
    })
})

// Get comic from id
router.get('/id/:id', async (req, res) => {
  const comicId = req.params.id
  // Get comic from DynamoDB
  await dynamiteClient
    .getItem(process.env.DYNAMODB_BOOK_TABLE_NAME)
    .setHashKey('id', comicId)
    .execute()
    .then((data) => {
      res.status(200).send({
        status: 'success',
        response: filterComicData(data.result)
      })
    })
})

module.exports = router

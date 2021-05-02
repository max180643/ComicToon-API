const router = require('express').Router()
const uploadSinglePDFS3 = require('../controllers/pdfController')
const dynamiteClient = require('../util/dynamite.config')
const { DateTime } = require('luxon')
const {
  filterEpisode,
  filterEpisodeURL
} = require('../controllers/dataController')
const dotenv = require('dotenv')

dotenv.config()

// Add new episode
router.post('/add', async (req, res) => {
  await uploadSinglePDFS3(req, res, (err) => {
    // File type error
    if (err) {
      return res.status(400).send({
        status: 'failure',
        response: 'only .pdf format allowed.'
      })
    }

    // Get data from request body
    const { comic_id, title, price } = req.body

    // Get data from uploadSinglePDFS3
    const { key, location } = req.file

    // Prepare data
    const episodeData = {
      id: key.slice(6, 16),
      comic_id: comic_id,
      title: title,
      price: parseInt(price),
      path: location,
      date: DateTime.now().setZone('Asia/Bangkok').toString()
    }

    // Add new record to DynamoDB
    dynamiteClient
      .putItem(process.env.DYNAMODB_EPISODE_TABLE_NAME, episodeData)
      .execute()
      .then((data) => {
        res.status(200).send({
          status: 'success',
          response: data.result
        })
      })
  })
})

// Get all episodes from comic id
router.get('/all/:id', async (req, res) => {
  const comicId = req.params.id

  // Get all records from DynamoDB
  if (comicId) {
    const filter = dynamiteClient
      .newConditionBuilder()
      .filterAttributeEquals('comic_id', comicId)

    await dynamiteClient
      .newScanBuilder(process.env.DYNAMODB_EPISODE_TABLE_NAME)
      .withFilter(filter)
      .execute()
      .then((data) => {
        const formatData = data.result.map((record) => {
          return filterEpisode(record)
        })

        res.status(200).send({
          status: 'success',
          response: formatData
        })
      })
  }
})

// Get PDF from episode id
router.get('/id/:id', async (req, res) => {
  const episodeId = req.params.id

  // Get record from DynamoDB
  if (episodeId) {
    await dynamiteClient
      .getItem(process.env.DYNAMODB_EPISODE_TABLE_NAME)
      .setHashKey('id', episodeId)
      .execute()
      .then((data) => {
        res.status(200).send({
          status: 'success',
          response: filterEpisodeURL(data.result)
        })
      })
  }
})

module.exports = router

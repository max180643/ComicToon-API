const Dynamite = require('dynamite')
const dotenv = require('dotenv')

dotenv.config()

const options = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
}

const dynamiteClient = new Dynamite.Client(options)

module.exports = dynamiteClient

const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require('../util/s3.config')
const { nanoid } = require('nanoid')
const dotenv = require('dotenv')

dotenv.config()

// check upload file type
const imageFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('invalid mime type'))
  }
}

const uploadImageS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, `cover-${nanoid(10)}-${file.originalname}`)
    }
  }),
  fileFilter: imageFilter
})

module.exports = uploadImageS3.single('file')

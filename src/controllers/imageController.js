const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require('../util/s3.config')

// check upload file type
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
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
    bucket: 'comictoon-bucket',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname)
    }
  }),
  fileFilter: imageFilter
})

module.exports = uploadImageS3.single('file')

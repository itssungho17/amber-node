const multer = require('multer')
const path = require('path')
const util = require('util')
const maxSize = 100 * 1024 * 1024

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __storagedir)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, path.basename(file.originalname, ext) + '_' + Date.now() + ext)
  }
})

let uploadFileMulter = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).single('file')

let uploadFile = util.promisify(uploadFileMulter)
module.exports = uploadFile

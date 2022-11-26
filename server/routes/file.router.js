const router = require('express').Router()
const controller = require('../controllers/file.controller.js')

router.get('/', controller.getFileList)
router.post('/upload', controller.upload)
router.get('/:filename', controller.download)
router.delete('/:filename', controller.remove)

module.exports = router

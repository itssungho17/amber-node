const fs = require('fs')
const { uploadFile } = require('../middleware')

const getFileList =(req, res) => {
  fs.readdir(__storagedir, function (err, files) {
    if (err) {
      res.status(500).send({ message: `Could not read files. Caused by ${err}.` })
    }

    let fileInfos = []

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: __storagedir + file
      })
    })

    res.status(200).send({ data: fileInfos })
  })
}

const upload = async (req, res) => {
  try {
    await uploadFile(req, res)

    if (req.file == undefined) {
      return res.status(400).send({ message: 'Please upload a file.' })
    }

    res.status(200).send({
      message: `Uploaded the file successfully: ${req.file.originalname}.`
    })
  } catch (err) {
    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File size cannot be larger than 100MB.'
      })
    }

    return res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname} caused by ${err}.`
    })
  }
}

const download = (req, res) => {
  const filename = req.params.filename

  res.download(__storagedir + filename, filename, (err) => {
    if (err) {
      res.status(500).send({ message: `Could not download the file. Caused by ${err}.` })
    }
  })
}

const remove = (req, res) => {
  const filename = req.params.filename

  try {
    fs.unlinkSync(__storagedir + filename)

    res.status(200).send({ message: 'File is deleted.' })

  } catch (err) {
    res.status(500).send({ message: `Could not delete the file. Caused by ${err}.` })
  }
}

module.exports = { getFileList, upload, download, remove }

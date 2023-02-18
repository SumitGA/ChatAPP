const multer = require('multer')
const fs = require('fs')
const path = require('path')

const getFileType = (file) => {
  const mimeType = file.mimetype.split('/')
  return mimeType[mimeType.length - 1]
}

const generateFileName = (req, file, cb) => {
  const extension = getFileType(file)
  const filename =
    Date.now() + '-' + Math.round(Math.random() * 1e9) + `.` + extension
  cb(null, file.fieldname + '-' + filename)
}

const fileFilter = (req, file, cb) => {
  const extension = getFileType(file)

  const allowedTypes = /jpeg|jpg|png/

  const passed = allowedTypes.test(extension)
  if (passed) {
    return cb(null, true)
  }

  return cb(null, false)
}

exports.userFile = ((req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const { id } = req.user
      const dest = `uploads/user/${id}`

      fs.access(dest, (err) => {
        // File does not exits if error
        if (err) {
          return fs.mkdir(dest, (err) => {
            cb(err, dest)
          })
        } else {
          // File does exists
          fs.readdir(dest, (err, files) => {
            if (err) throw err
            for (const file of files) {
              fs.unlink(path.join(dest, file), (err) => {
                if (err) throw err
              })
            }
          })
          return cb(null, dest)
        }
      })
    },
    filename: generateFileName,
  })

  // Using multer package for file upload
  return multer({ storage, fileFilter }).single('avatar')
})()

const AWS = require('aws-sdk')
const uuid = require('uuid').v4
const getImageUrl = require('../utils/getImageUrl')
const { AmazonError } = require('../utils/CustomErrors')

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, AWS_REGION } = process.env

AWS.config.update({
  region: AWS_REGION
})

const imageUpload = async (file, folder) => {
  const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  })

  const format = file.mimetype.split('/')[1]
  const { mimetype } = file
  const hashedName = `${uuid()}-${Date.now()}`

  const path = `${folder}/${hashedName}.${format}`

  const data = {
    Bucket: AWS_BUCKET_NAME,
    Key: path,
    Body: file.buffer,
    ContentType: mimetype
  }

  s3.putObject(data, function (err, data) {
    if (err) {
      console.log(err)
      console.log('Error uploading data: ', data)
      throw new AmazonError('An error has occured uploading an image to the s3 bucket!')
    } else {
      console.log('Successfully uploaded!')
      console.log(data)
    }
  })

  return getImageUrl(path)
}

module.exports = imageUpload

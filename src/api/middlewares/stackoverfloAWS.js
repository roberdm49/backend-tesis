const AWS = require('aws-sdk')
const uuid = require('uuid').v4

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, AWS_REGION } = process.env

AWS.config.update({
  region: AWS_REGION
})

const imageUpload = async (base64) => {
  const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  })

  const buf = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  const data = {
    Bucket: AWS_BUCKET_NAME,
    Key: `Avatars/${uuid()}.jpeg`, // refactor, the type must be the real one
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg' // refactor, the type must be the real one,
  }
  const response = s3.upload(data, function (err, data) {
    if (err) {
      console.log(err)
      console.log('Error uploading data: ', data)
    } else {
      console.log('Successfully uploaded!')
    }
  })

  return response
}

module.exports = imageUpload

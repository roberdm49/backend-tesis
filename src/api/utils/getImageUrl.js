const { AWS_S3_BUCKET_NAME, AWS_REGION } = process.env

const getImageUrl = (imagePath) => {
  return `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${imagePath}`
}

module.exports = getImageUrl

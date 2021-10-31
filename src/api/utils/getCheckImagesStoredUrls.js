const uploadAvatar = require('../middlewares/stackoverfloAWS')
const { AWS_BUCKET_NAME } = process.env

const getCheckImagesStoredUrls = async (images) => {
  if (images?.length) {
    const folder = 'checks'
    const responses = await Promise.all(images.map(image => {
      return uploadAvatar(image, folder)
    }))

    const urls = responses.map(response => {
      const host = response.service.endpoint.host
      const imagePath = response.service.config.params.Key
      const url = `https://${AWS_BUCKET_NAME}.${host}/${imagePath}`
      return url
    })

    return urls
  }

  return []
}

module.exports = getCheckImagesStoredUrls

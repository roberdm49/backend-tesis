const uploadAvatar = require('../middlewares/stackoverfloAWS')

const getCheckImagesStoredUrls = async (images) => {
  if (images?.length) {
    const folder = 'checks'
    const imagesUrl = await Promise.all(images.map(image => {
      return uploadAvatar(image, folder)
    }))

    return imagesUrl
  }

  return []
}

module.exports = getCheckImagesStoredUrls

const uploadAvatar = require('../middlewares/stackoverfloAWS')

const getAvatarStoredUrl = async (avatar) => {
  if (avatar) {
    const uploadedAvatar = await uploadAvatar(avatar)
    const host = uploadedAvatar.service.endpoint.host
    const imagePath = uploadedAvatar.service.config.params.Key
    const url = `https://${process.env.AWS_BUCKET_NAME}.${host}/${imagePath}`
    return url
  }

  return null
}

module.exports = getAvatarStoredUrl

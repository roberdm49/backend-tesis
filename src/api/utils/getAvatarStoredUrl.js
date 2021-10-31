const uploadAvatar = require('../middlewares/stackoverfloAWS')
const { AWS_BUCKET_NAME } = process.env

const getAvatarStoredUrl = async (avatar) => {
  if (avatar) {
    const folder = 'avatars'
    const uploadedAvatar = await uploadAvatar(avatar, folder)
    const host = uploadedAvatar.service.endpoint.host
    const imagePath = uploadedAvatar.params.Key
    const url = `https://${AWS_BUCKET_NAME}.${host}/${imagePath}`

    return url
  }

  return null
}

module.exports = getAvatarStoredUrl

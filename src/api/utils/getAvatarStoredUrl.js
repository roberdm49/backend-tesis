const uploadAvatar = require('../middlewares/stackoverfloAWS')

const getAvatarStoredUrl = async (avatar) => {
  if (avatar) {
    const folder = 'avatars'
    const uploadedAvatar = await uploadAvatar(avatar, folder)
    console.log({ uploadedAvatar })
    const host = uploadedAvatar.service.endpoint.host
    const imagePath = uploadedAvatar.params.Key
    const url = `https://${process.env.AWS_BUCKET_NAME}.${host}/${imagePath}`

    return url
  }

  return null
}

module.exports = getAvatarStoredUrl

const uploadAvatar = require('../middlewares/stackoverfloAWS')

const getAvatarStoredUrl = async (avatar) => {
  if (avatar) {
    const folder = 'avatars'
    const uploadedAvatar = await uploadAvatar(avatar, folder)
    return uploadedAvatar
  }

  return null
}

module.exports = getAvatarStoredUrl

const getFilteredUserInformation = (user) => {
  return {
    id: user.id,
    avatar: user.avatar,
    name: user.name,
    lastname: user.lastname,
    role: user.role
  }
}

module.exports = getFilteredUserInformation

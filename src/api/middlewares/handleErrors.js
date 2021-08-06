module.exports = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Bad request' })
  } else {
    return response.status(500).json({ error: 'Internal error' })
  }
}

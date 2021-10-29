module.exports = async (req, res) => {
  console.log(`${req.method} ${req.path}`)
  try {
    const username = req.params.username
    const after = req.query.after
    const limit = 50

    const data = await req.reddit.getSavedContent(username, { after, limit })
    // res.set(rateLimit)
    if (req.reddit.newTokens) {
      res = req.reddit.setTokenCookies(res)
    }
    console.log(`send(data)`)
    res.send(data)
  } catch (error) {
    next(error)
  }
}
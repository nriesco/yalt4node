// const lib = require('../src/')

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const main = (req, res) => {
  res.status(200).send('ok')
}
exports.main = main

module.exports = {
  main
}

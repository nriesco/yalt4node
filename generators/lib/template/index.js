if (process.env.CLOUD_FUNCTION) {
  module.exports = require('./cloud_function/')
} else {
  module.exports = require('./src/')
}

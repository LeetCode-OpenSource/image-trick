const jwt = require('jsonwebtoken')

function jwtEncode (str) {
  return jwt.sign(str, 'secret')
}

function jwtDecode (str) {
  return jwt.decode(str)
}

module.exports = {
  encode: jwtEncode,
  decode: jwtDecode,
  jwtEncode,
  jwtDecode
}

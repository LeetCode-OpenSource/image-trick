function encodeBase64 (str) {
  const buf = Buffer.from(str, 'utf8')
  return buf.toString('base64')
}

function decodeBase64 (encodedStr) {
  const buf = Buffer.from(encodedStr, 'base64')
  return buf.toString('utf8')
}

module.exports = {
  encode: encodeBase64,
  decode: decodeBase64,
  encodeBase64,
  decodeBase64
}

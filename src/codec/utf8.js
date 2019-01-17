function utf8ToHex (str) {
  const buf = Buffer.from(str, 'utf8')
  return buf.toString('hex')
}

function hexToUtf8 (hexStr) {
  const buf = Buffer.from(hexStr, 'hex')
  return buf.toString('utf8')
}

module.exports = {
  encode: utf8ToHex,
  decode: hexToUtf8,
  utf8ToHex,
  hexToUtf8
}

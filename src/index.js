const { composeCodec } = require('./compose')
const { utf8, base64 } = require('./codec')
const { imgToAscii } = require('./img-to-ascii')

const { encode, decode } = composeCodec(base64, utf8)

const imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg'
const code = encode('测试数据')

console.log(code)
console.log(decode(code))

imgToAscii(imgUrl, code + '//////')
